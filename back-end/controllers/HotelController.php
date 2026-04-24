<?php
class HotelController {
    private $projectId = 'hotel-booking-a3022'; 
    private $apiUrl;

    public function __construct() {
        $this->apiUrl = "https://firestore.googleapis.com/v1/projects/{$this->projectId}/databases/(default)/documents/";
    }

    private function getHotelsIds($collection) {
        $response = file_get_contents($this->apiUrl . $collection);
        
        if ($response === false) {
            return []; 
        }

        $firestoreData = json_decode($response, true);
        $cleanHotelsId = [];

        if (isset($firestoreData['documents'])) {
            foreach ($firestoreData['documents'] as $doc) {
                $fields = $doc['fields'];

                $rawHotelsId = isset($fields['hotelsId']['arrayValue']['values']) 
                    ? $fields['hotelsId']['arrayValue']['values'] 
                    : [];

                foreach ($rawHotelsId as $item) {
                    if (isset($item['stringValue'])) {
                        $cleanHotelsId[] = $item['stringValue']; 
                    }
                }
            }
        }
        return $cleanHotelsId; 
    }

    private function getAllHotels() {
        $response = file_get_contents($this->apiUrl . 'hotels');
        
        if ($response === false) {
            return null; 
        }

        $doc = json_decode($response, true);
        $document = $doc['documents'] ?? []; 
        $allHotels = [];

        foreach($document as $hotelDoc) {
            $hotelId = strripos($hotelDoc['name'], '/') + 1;
            $hotelId = substr($hotelDoc['name'], $hotelId); 
            $fields = $hotelDoc['fields'] ?? [];
            $hotel = [
                'id' => $hotelId,
                'name' => isset($fields['name']['stringValue']) ? $fields['name']['stringValue'] : '',
                'location' => isset($fields['location']['stringValue']) ? $fields['location']['stringValue'] : '',
            ];
            $allHotels[] = $hotel;
        }

        return $allHotels;

    }

    public function fetchHotelData($id) {
        $response = file_get_contents($this->apiUrl . 'hotels/' . $id);
        
        if ($response === false) {
            return null; 
        }

        $doc = json_decode($response, true);
        $fields = $doc['fields'] ?? []; 
        $photoUrl = [];
        $options = [];

        $rowPhotoUrls = isset($fields['photo']['arrayValue']['values']) 
                    ? $fields['photo']['arrayValue']['values'] 
                    : [];
        
        $rowOptions = isset($fields['options']['arrayValue']['values']) 
                    ? $fields['options']['arrayValue']['values'] 
                    : [];
        
        foreach ($rowPhotoUrls as $item) {
            if (isset($item['stringValue'])) {
                $photoUrl[] = $item['stringValue']; 
            }
        }

        foreach ($rowOptions as $item) {
            if (isset($item['stringValue'])) {
                $options[] = $item['stringValue']; 
            }
        }

        $hotel = [
            'id' => $id,
            'name' => isset($fields['name']['stringValue']) ? $fields['name']['stringValue'] : '',
            'location' => isset($fields['location']['stringValue']) ? $fields['location']['stringValue'] : '',
            'description' => isset($fields['description']['stringValue']) ? $fields['description']['stringValue'] : '',
            'rating' => isset($fields['rating']['doubleValue']) ? $fields['rating']['doubleValue'] : 0.0,
            'photo' => $photoUrl,
            'options' => $options,

        ];

        $trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 2);
        
        $callerClass = $trace[1]['class'] ?? null;

        if ($callerClass === __CLASS__) {
            return $hotel; 
        } else {
            http_response_code(200);
            echo json_encode($hotel);
        }

        
    }

    public function getSuggestionsHotels($collection) {
        $ids = $this->getHotelsIds($collection);
        
        $finalHotels = [];

        foreach ($ids as $id) {
            $hotelData = $this->fetchHotelData($id);
            
            if ($hotelData !== null) {
                $finalHotels[] = $hotelData;
            }
        }

        http_response_code(200);
        echo json_encode($finalHotels);
    }

    private function filterHotelsByParam($param) {
        $allHotels = $this->getAllHotels();
        $filteredHotels = [];

        foreach ($allHotels as $hotel) {
            
            if (stripos($hotel['name'], $param) !== false || stripos($hotel['location'], $param) !== false) {
                $filteredHotels[] = $hotel['id'];
            }
        }

        return $filteredHotels;
    }

    public function searchHotels($param) {
        $filteredHotelIds = $this->filterHotelsByParam($param);
        $finalHotels = [];

        foreach ($filteredHotelIds as $id) {
            $hotelData = $this->fetchHotelData($id);
            
            if ($hotelData !== null) {
                $finalHotels[] = $hotelData;
            }
        }

        http_response_code(200);
        echo json_encode($finalHotels);
    }

    public function getRoomsListByHotelId($hotelId) {
        $response = file_get_contents($this->apiUrl . 'hotels/' . $hotelId . '/rooms');
        
        if ($response === false) {
            return null; 
        }

        $doc = json_decode($response, true);
        $document = $doc['documents'] ?? []; 
        $roomsList = [];

        foreach($document as $roomDoc) {
            $roomId = strripos($roomDoc['name'], '/') + 1;
            $roomId = substr($roomDoc['name'], $roomId); 
            $fields = $roomDoc['fields'] ?? [];
            $options = [];
            $photoUrl = [];
            foreach ($fields['options']['arrayValue']['values'] as $item) {
                if (isset($item['stringValue'])) {
                    $options[] = $item['stringValue']; 
                }
            }
            foreach ($fields['photo']['arrayValue']['values'] as $item) {
                if (isset($item['stringValue'])) {
                    $photoUrl[] = $item['stringValue']; 
                }
            }
            $room = [
                'id' => $roomId,
                'type' => isset($fields['type']['stringValue']) ? $fields['type']['stringValue'] : '',
                'price' => isset($fields['pricePerNight']['integerValue']) ? $fields['pricePerNight']['integerValue'] : 0.0,
                'capacity' => isset($fields['capacity']['integerValue']) ? (int)$fields['capacity']['integerValue'] : 0,
                'photo' => $photoUrl,
                'options' => $options,
            ];
            $roomsList[] = $room;
        }
        http_response_code(200);
        echo json_encode($roomsList);
    }

}