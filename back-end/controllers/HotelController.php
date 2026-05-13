<?php

class HotelController {
    private $projectId = 'hotel-booking-a3022'; 
    private $apiUrl;

    public function __construct() {
        $this->apiUrl = "https://firestore.googleapis.com/v1/projects/{$this->projectId}/databases/(default)/documents/";
    }

    private function sendResponse($data, $statusCode = 200) {
        http_response_code($statusCode);
        echo json_encode($data);
        exit(); 
    }


    private function fetchFromFirestore($endpoint) {
        $response = @file_get_contents($this->apiUrl . $endpoint);
        return $response !== false ? json_decode($response, true) : null;
    }


    private function extractFieldValue($field) {
        if (!isset($field)) return null;
        if (isset($field['stringValue'])) return $field['stringValue'];
        if (isset($field['integerValue'])) return (int)$field['integerValue'];
        if (isset($field['doubleValue'])) return (float)$field['doubleValue'];
        if (isset($field['booleanValue'])) return $field['booleanValue'];
        
        if (isset($field['arrayValue']['values'])) {
            return array_map([$this, 'extractFieldValue'], $field['arrayValue']['values']);
        }
        return null;
    }


    private function extractIdFromName($namePath) {
        $parts = explode('/', $namePath);
        return end($parts);
    }


    private function getHotelDataById($id) {
        $doc = $this->fetchFromFirestore("hotels/{$id}");
        if (!$doc || !isset($doc['fields'])) return null;

        $fields = $doc['fields'];

        return [
            'id'          => $id,
            'name'        => $this->extractFieldValue($fields['name'] ?? null) ?: '',
            'location'    => $this->extractFieldValue($fields['location'] ?? null) ?: '',
            'description' => $this->extractFieldValue($fields['description'] ?? null) ?: '',
            'rating'      => $this->extractFieldValue($fields['rating'] ?? null) ?: 0.0,
            'priceFrom'   => $this->extractFieldValue($fields['priceFrom'] ?? null) ?: 0,
            'photo'       => $this->extractFieldValue($fields['photo'] ?? null) ?: [],
            'options'     => $this->extractFieldValue($fields['options'] ?? null) ?: []
        ];
    }

    private function getAllHotels() {
        $doc = $this->fetchFromFirestore('hotels');
        if (!$doc || empty($doc['documents'])) return [];

        $allHotels = [];
        foreach($doc['documents'] as $hotelDoc) {
            $fields = $hotelDoc['fields'] ?? [];
            $allHotels[] = [
                'id'       => $this->extractIdFromName($hotelDoc['name']),
                'name'     => $this->extractFieldValue($fields['name'] ?? null) ?: '',
                'location' => $this->extractFieldValue($fields['location'] ?? null) ?: '',
            ];
        }
        return $allHotels;
    }

    private function getHotelsIds($collection) {
        $doc = $this->fetchFromFirestore($collection);
        if (!$doc || empty($doc['documents'])) return [];

        $cleanHotelsId = [];
        foreach ($doc['documents'] as $document) {
            $ids = $this->extractFieldValue($document['fields']['hotelsId'] ?? null) ?: [];
            $cleanHotelsId = array_merge($cleanHotelsId, $ids);
        }
        return $cleanHotelsId; 
    }

    private function filterHotelsByParam($param) {
        $allHotels = $this->getAllHotels();
        $filteredHotelIds = [];
        $searchParam = mb_strtolower($param);

        foreach ($allHotels as $hotel) {
            $nameMatch = mb_stripos($hotel['name'], $searchParam) !== false;
            $locMatch = mb_stripos($hotel['location'], $searchParam) !== false;
            
            if ($nameMatch || $locMatch) {
                $filteredHotelIds[] = $hotel['id'];
            }
        }
        return $filteredHotelIds;
    }

    private function filterRoomByDate($hotelId, $roomId, $checkIn, $checkOut) {
        $doc = $this->fetchFromFirestore("hotels/{$hotelId}/rooms/{$roomId}");
        if (!$doc) return null;

        $fields = $doc['fields'] ?? [];
        $dates = $this->extractFieldValue($fields['date'] ?? null) ?: [];

        $newCheckIn = new DateTime($checkIn);
        $newCheckOut = new DateTime($checkOut);

        foreach ($dates as $dateString) {
            $bookedDate = explode('-', $dateString);
            $bookedStartDate = new DateTime($bookedDate[0]);
            $bookedEndDate = new DateTime($bookedDate[1]);

            // Если даты пересекаются, комната занята
            if ($newCheckIn < $bookedEndDate && $newCheckOut > $bookedStartDate) {
                return false; 
            }
        }
        return $roomId; 
    }


    public function fetchHotelData($id) {
        $hotel = $this->getHotelDataById($id);
        
        if ($hotel) {
            $this->sendResponse($hotel);
        } else {
            $this->sendResponse(["error" => "Отель не найден"], 404);
        }
    }

    public function getSomeHotelsById($ids) {
        $hotels = [];
        foreach ($ids as $id) {
            $hotelData = $this->getHotelDataById($id);
            if ($hotelData) $hotels[] = $hotelData;
        }
        $this->sendResponse($hotels);
    }

    public function getSuggestionsHotels($collection) {
        $ids = $this->getHotelsIds($collection);
        $this->getSomeHotelsById($ids); 
    }

    public function searchHotels($param) {
        $filteredHotelIds = $this->filterHotelsByParam($param);
        $this->getSomeHotelsById($filteredHotelIds);
    }

    public function getRoomsListByHotelId($hotelId) {
        $doc = $this->fetchFromFirestore("hotels/{$hotelId}/rooms");
        if (!$doc || empty($doc['documents'])) {
            $this->sendResponse([]); 
        }

        $roomsList = [];
        foreach($doc['documents'] as $roomDoc) {
            $fields = $roomDoc['fields'] ?? [];
            $roomsList[] = [
                'id'       => $this->extractIdFromName($roomDoc['name']),
                'type'     => $this->extractFieldValue($fields['type'] ?? null) ?: '',
                'price'    => $this->extractFieldValue($fields['pricePerNight'] ?? null) ?: 0,
                'capacity' => $this->extractFieldValue($fields['capacity'] ?? null) ?: 0,
                'photo'    => $this->extractFieldValue($fields['photo'] ?? null) ?: [],
                'options'  => $this->extractFieldValue($fields['options'] ?? null) ?: [],
            ];
        }
        $this->sendResponse($roomsList);
    }

    public function getHotelsByParam($location, $guests, $startDate, $endDate) {
        $filteredByLocation = $this->filterHotelsByParam($location);
        $filteredHotels = [];

        foreach ($filteredByLocation as $hotelId) {
            $doc = $this->fetchFromFirestore("hotels/{$hotelId}/rooms");
            if (!$doc || empty($doc['documents'])) continue;

            $availableRooms = [];

            foreach($doc['documents'] as $roomDoc) {
                $fields = $roomDoc['fields'] ?? [];
                $roomId = $this->extractIdFromName($roomDoc['name']);
                $capacity = $this->extractFieldValue($fields['capacity'] ?? null) ?: 0;

                if ($capacity >= (int)$guests) {
                    if ($this->filterRoomByDate($hotelId, $roomId, $startDate, $endDate)) {
                        $availableRooms[] = $roomId;
                    }
                }
            }

            if (!empty($availableRooms)) {
                $hotelData = $this->getHotelDataById($hotelId);
                $hotelData['availableRooms'] = $availableRooms;
                $filteredHotels[] = $hotelData;
            }
        }

        $this->sendResponse($filteredHotels);
    }

    public function hotelReservation($hotelData) {
        $commitUrl = "https://firestore.googleapis.com/v1/projects/{$this->projectId}/databases/(default)/documents:commit";
        $fullDocumentPath = "projects/{$this->projectId}/databases/(default)/documents/hotels/{$hotelData['hotelId']}/rooms/{$hotelData['roomId']}";

        $data = [
            'writes' => [
                [
                    'transform' => [
                        'document' => $fullDocumentPath,
                        'fieldTransforms' => [
                            [
                                'fieldPath' => 'bookings', 
                                'appendMissingElements' => [
                                    'values' => [
                                        [
                                            'mapValue' => [
                                                'fields' => [
                                                    'startDate' => ['stringValue' => $hotelData['startDate']],
                                                    'endDate'   => ['stringValue' => $hotelData['endDate']]
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ];

        $options = [
            'http' => [
                'header'  => "Content-Type: application/json\r\n",
                'method'  => 'POST',
                'content' => json_encode($data),
                'ignore_errors' => true
            ]
        ];

        $context  = stream_context_create($options);
        $response = file_get_contents($commitUrl, false, $context);
        $statusCode = $http_response_header[0];
    
        if (strpos($statusCode, '200') !== false) {
            return true;
        } 
        
        error_log("Firebase Reservation Error: " . $response);
        return false;
    }
}