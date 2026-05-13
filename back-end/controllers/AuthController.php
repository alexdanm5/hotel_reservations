<?php

class AuthController {
    private $projectId = 'hotel-booking-a3022'; 
    private $apiUrl;

    public function __construct() {
        $this->apiUrl = "https://firestore.googleapis.com/v1/projects/{$this->projectId}/databases/(default)/documents";
    }

    private function sendResponse($data, $statusCode = 200) {
        http_response_code($statusCode);
        echo json_encode($data);
        exit(); 
    }

    private function postToFirestore($endpoint, $payload) {
        $options = [
            'http' => [
                'header'  => "Content-Type: application/json\r\n",
                'method'  => 'POST',
                'content' => json_encode($payload),
                'ignore_errors' => true
            ]
        ];

        $context  = stream_context_create($options);
        $response = file_get_contents($this->apiUrl . $endpoint, false, $context);
        
        return $response !== false ? json_decode($response, true) : null;
    }

    private function extractFieldValue($field) {
        if (!isset($field)) return null;
        if (isset($field['stringValue'])) return $field['stringValue'];
        return null;
    }

    private function extractIdFromName($namePath) {
        $parts = explode('/', $namePath);
        return end($parts);
    }


    public function login($data) {
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            $this->sendResponse(["error" => "Email и пароль обязательны"], 400);
        }

        $queryPayload = [
            'structuredQuery' => [
                'from'  => [['collectionId' => 'users']],
                'where' => [
                    'fieldFilter' => [
                        'field' => ['fieldPath' => 'email'],
                        'op'    => 'EQUAL',
                        'value' => ['stringValue' => $email]
                    ]
                ],
                'limit' => 1 
            ]
        ];

        $firestoreData = $this->postToFirestore(':runQuery', $queryPayload);

        if (empty($firestoreData) || !isset($firestoreData[0]['document'])) {
            $this->sendResponse(["error" => "Пользователь с таким email не найден"], 401);
        }

        $userDoc = $firestoreData[0]['document'];
        $fields = $userDoc['fields'] ?? [];
        
        $savedPassword = $this->extractFieldValue($fields['password'] ?? null);

        if ($password === $savedPassword) {
            $this->sendResponse([
                "success"   => true,
                "userId"    => $this->extractIdFromName($userDoc['name']),
                "firstName" => $this->extractFieldValue($fields['firstName'] ?? null) ?: '',
                "lastName"  => $this->extractFieldValue($fields['lastName'] ?? null) ?: '',
                "email"     => $email
            ]);
        } else {
            $this->sendResponse(["error" => "Неверный пароль"], 401);
        }
    }
}