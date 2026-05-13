<?php

class UserController {
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


    private function commitToFirestore($writes) {
        $commitUrl = "https://firestore.googleapis.com/v1/projects/{$this->projectId}/databases/(default)/documents:commit";
        
        $options = [
            'http' => [
                'header'  => "Content-Type: application/json\r\n",
                'method'  => 'POST',
                'content' => json_encode(['writes' => $writes]),
                'ignore_errors' => true
            ]
        ];

        $context  = stream_context_create($options);
        $response = file_get_contents($commitUrl, false, $context);
        $statusCode = $http_response_header[0];

        if (strpos($statusCode, '200') !== false) {
            return true;
        }

        error_log("Firestore Commit Error: " . $response);
        return false;
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

 
    private function getUserDocumentPath($userId) {
        return "projects/{$this->projectId}/databases/(default)/documents/users/{$userId}";
    }

    
    public function getUserInfo($userId = '0aYgHkZfBSaxBmGUGhkh') {
        $doc = $this->fetchFromFirestore("users/{$userId}");
        
        if (!$doc || !isset($doc['fields'])) {
            $this->sendResponse(["error" => "Пользователь не найден"], 404);
        }

        $fields = $doc['fields'];

        $userInfo = [
            'firstName'      => $this->extractFieldValue($fields['firstName'] ?? null) ?: '',
            'lastName'       => $this->extractFieldValue($fields['lastName'] ?? null) ?: '',
            'photo'          => $this->extractFieldValue($fields['photo'] ?? null) ?: '',
            'favoriteHotels' => $this->extractFieldValue($fields['liked'] ?? null) ?: [],
            'notifications'  => $this->extractFieldValue($fields['notifications'] ?? null) ?: []
        ];

        $this->sendResponse($userInfo);
    }


    public function getFavoritesHotels($userId = '0aYgHkZfBSaxBmGUGhkh') {
        $doc = $this->fetchFromFirestore("users/{$userId}");
        if (!$doc || !isset($doc['fields'])) return [];

        return $this->extractFieldValue($doc['fields']['liked'] ?? null) ?: [];
    }

    public function addHotelToFavorites($hotelId, $userId = '0aYgHkZfBSaxBmGUGhkh') {
        $writes = [[
            'transform' => [
                'document' => $this->getUserDocumentPath($userId),
                'fieldTransforms' => [[
                    'fieldPath' => 'liked', 
                    'appendMissingElements' => [
                        'values' => [['stringValue' => $hotelId]]
                    ]
                ]]
            ]
        ]];

        if ($this->commitToFirestore($writes)) {
            $this->sendResponse(["success" => true, "message" => "Элемент успешно добавлен"]);
        } else {
            $this->sendResponse(["error" => "Ошибка при добавлении в избранное"], 400);
        }
    }

    public function removeHotelFromFavorites($hotelId, $userId = '0aYgHkZfBSaxBmGUGhkh') {
        $writes = [[
            'transform' => [
                'document' => $this->getUserDocumentPath($userId),
                'fieldTransforms' => [[
                    'fieldPath' => 'liked', 
                    'removeAllFromArray' => [
                        'values' => [['stringValue' => $hotelId]]
                    ]
                ]]
            ]
        ]];

        if ($this->commitToFirestore($writes)) {
            $this->sendResponse(["success" => true, "message" => "Элемент успешно удален"]);
        } else {
            $this->sendResponse(["error" => "Ошибка при удалении из избранного"], 400);
        }
    }

    public function changeUserData($userData, $userId = '0aYgHkZfBSaxBmGUGhkh') {
        $fields = [];
        $fieldPaths = [];

        $allowedFields = ['firstName', 'lastName', 'email'];
        foreach ($allowedFields as $field) {
            if (isset($userData[$field])) {
                $fields[$field] = ['stringValue' => $userData[$field]];
                $fieldPaths[] = $field;
            }
        }

        if (empty($fields)) {
            $this->sendResponse(["message" => "Нет данных для обновления"]);
        }

        $writes = [[
            'update' => [
                'name' => $this->getUserDocumentPath($userId),
                'fields' => $fields 
            ],
            'updateMask' => [
                'fieldPaths' => $fieldPaths 
            ]
        ]];

        if ($this->commitToFirestore($writes)) {
            $this->sendResponse(["success" => true, "data" => $userData]);
        } else {
            $this->sendResponse(["error" => "Ошибка Firebase при обновлении профиля"], 400);
        }
    }

    public function sendNotification($inputData, $userId = '0aYgHkZfBSaxBmGUGhkh') {
        $hotel = $inputData['name'] ?? 'отеле';
        $room = $inputData['type'] ?? 'номер';
        $startDate = $inputData['startDate'] ?? '';
        $endDate = $inputData['endDate'] ?? '';
        
        $message = "You have booked a room at the {$hotel}. Your room type is {$room}. Date: {$startDate} through {$endDate}.";

        $writes = [[
            'transform' => [
                'document' => $this->getUserDocumentPath($userId),
                'fieldTransforms' => [[
                    'fieldPath' => 'notifications', 
                    'appendMissingElements' => [
                        'values' => [['stringValue' => $message]]
                    ]
                ]]
            ]
        ]];

        if ($this->commitToFirestore($writes)) {
            $this->sendResponse(["success" => true]);
        } else {
            $this->sendResponse(["error" => "Ошибка при отправке уведомления"], 400);
        }
    }

    public function removeNotifications($inputData, $userId = '0aYgHkZfBSaxBmGUGhkh') {
        $writes = [[
            'update' => [
                'name' => $this->getUserDocumentPath($userId), 
                'fields' => [
                    'notifications' => ['arrayValue' => ['values' => []]]
                ]
            ],
            'updateMask' => [
                'fieldPaths' => ['notifications']
            ]
        ]];

        if ($this->commitToFirestore($writes)) {
            $this->sendResponse(["success" => true]);
        } else {
            $this->sendResponse(["error" => "Ошибка при очистке уведомлений"], 400);
        }
    }
}