<?php

class AuthController {
    private $projectId = 'hotel-booking-a3022'; 

    public function login($data) {
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            http_response_code(400);
            echo json_encode(["error" => "Email и пароль обязательны"]);
            return;
        }

        $url = "https://firestore.googleapis.com/v1/projects/{$this->projectId}/databases/(default)/documents:runQuery";

        $queryPayload = [
            'structuredQuery' => [
                'from' => [
                    ['collectionId' => 'users']
                ],
                'where' => [
                    'fieldFilter' => [
                        'field' => ['fieldPath' => 'email'],
                        'op' => 'EQUAL',
                        'value' => ['stringValue' => $email]
                    ]
                ],
                'limit' => 1 
            ]
        ];

        $options = [
            'http' => [
                'header'  => "Content-Type: application/json\r\n",
                'method'  => 'POST',
                'content' => json_encode($queryPayload),
                'ignore_errors' => true
            ]
        ];

        $context  = stream_context_create($options);
        $response = file_get_contents($url, false, $context);
        
        $firestoreData = json_decode($response, true);

        if (empty($firestoreData) || !isset($firestoreData[0]['document'])) {
            http_response_code(401);
            echo json_encode(["error" => "Пользователь с таким email не найден"]);
            return;
        }

        $userDoc = $firestoreData[0]['document'];
        
        $savedPassword = $userDoc['fields']['password']['stringValue'] ?? '';

        if ($password === $savedPassword) {
            http_response_code(200);
            
            $pathParts = explode('/', $userDoc['name']);
            $userId = end($pathParts);

            echo json_encode([
                "success" => true,
                "userId" => $userId,
                "firstName" => $userDoc['fields']['firstName']['stringValue'] ?? '',
                "lastName" => $userDoc['fields']['lastName']['stringValue'] ?? '',
                "email" => $email
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["error" => "Неверный пароль"]);
        }
    }
}