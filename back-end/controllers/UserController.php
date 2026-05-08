<?php

class UserController {
    private $projectId = 'hotel-booking-a3022'; 
    private $apiUrl;

    public function __construct() {
        $this->apiUrl = "https://firestore.googleapis.com/v1/projects/{$this->projectId}/databases/(default)/documents/users/";
    }

    public function getUserInfo() {
        $response = file_get_contents($this->apiUrl . '0aYgHkZfBSaxBmGUGhkh' );
        
        if ($response === false) {
            return null; 
        }

        $doc = json_decode($response, true);
        $fields = $doc['fields'] ?? []; 
        $favoriteHotels = [];

        foreach ($fields['liked']['arrayValue']['values'] as $item) {
            if (isset($item['stringValue'])) {
                $favoriteHotels [] = $item['stringValue']; 
            }
        }
        $userInfo = [
            'firstName' => $fields['firstName']['stringValue'] ?? '',
            'lastName' => $fields['lastName']['stringValue'] ?? '',
            'photo' => $fields['photo']['stringValue'] ?? '',
            'favoriteHotels' => $favoriteHotels
        ];

        http_response_code(200);
        echo json_encode($userInfo);
    }

    public function getFavoritesHotels() {
        $response = file_get_contents($this->apiUrl . '0aYgHkZfBSaxBmGUGhkh' );
        
        if ($response === false) {
            return null; 
        }

        $doc = json_decode($response, true);
        $fields = $doc['fields'] ?? []; 
        $favoritesHotelsId = [];

        $rowHotelsId = isset($fields['liked']['arrayValue']['values']) 
                    ? $fields['liked']['arrayValue']['values'] 
                    : [];
        
        foreach ($rowHotelsId as $item) {
            if (isset($item['stringValue'])) {
                $favoritesHotelsId[] = $item['stringValue']; 
            }
        }
        return $favoritesHotelsId;
    }

    public function addHotelToFavorites($hotelId) {
        $commitUrl = "https://firestore.googleapis.com/v1/projects/{$this->projectId}/databases/(default)/documents:commit";
        $fullDocumentPath = "projects/{$this->projectId}/databases/(default)/documents/users/0aYgHkZfBSaxBmGUGhkh";

        $data = [
            'writes' => [
                [
                    'transform' => [
                        'document' => $fullDocumentPath,
                        'fieldTransforms' => [
                            [
                                'fieldPath' => 'liked', 
                                'appendMissingElements' => [
                                    'values' => [
                                        ['stringValue' => $hotelId] 
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
            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Элемент успешно добавлен в массив"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Ошибка при обновлении массива", "firebase_response" => json_decode($response)]);
        }
    }

    public function removeHotelFromFavorites($hotelId) {
        $commitUrl = "https://firestore.googleapis.com/v1/projects/{$this->projectId}/databases/(default)/documents:commit";
        $fullDocumentPath = "projects/{$this->projectId}/databases/(default)/documents/users/0aYgHkZfBSaxBmGUGhkh";

        $data = [
            'writes' => [
                [
                    'transform' => [
                        'document' => $fullDocumentPath,
                        'fieldTransforms' => [
                            [
                                'fieldPath' => 'liked', 
                                'removeAllFromArray' => [
                                    'values' => [
                                        ['stringValue' => $hotelId] 
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
            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Элемент успешно удален из массива"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Ошибка при обновлении массива", "firebase_response" => json_decode($response)]);
        }
    }
    public function changeUserData($userData) {
        $commitUrl = "https://firestore.googleapis.com/v1/projects/{$this->projectId}/databases/(default)/documents:commit";
        $fullDocumentPath = "projects/{$this->projectId}/databases/(default)/documents/users/0aYgHkZfBSaxBmGUGhkh";

        $fields = [];
        $fieldPaths = [];

        if (isset($userData['firstName'])) {
        $fields['firstName'] = ['stringValue' => $userData['firstName']];
        $fieldPaths[] = 'firstName';
        }

        if (isset($userData['lastName'])) {
            $fields['lastName'] = ['stringValue' => $userData['lastName']];
            $fieldPaths[] = 'lastName'; 
        }

        if (isset($userData['email'])) {
            $fields['email'] = ['stringValue' => $userData['email']];
            $fieldPaths[] = 'email'; 
        }

        if (empty($fields)) {
            http_response_code(200);
            echo json_encode(["message" => "Нет данных для обновления"]);
            return;
        }

        $data = [
            'writes' => [
                [
                    'update' => [
                        'name' => $fullDocumentPath,
                        'fields' => $fields 
                    ],
                    'updateMask' => [
                        'fieldPaths' => $fieldPaths 
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
            http_response_code(200);
            echo json_encode(["success" => true, "data" => $userData]); 
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Помилка Firebase", "details" => json_decode($response)]);
        }
    }

}   