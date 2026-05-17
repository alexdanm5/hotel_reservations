<?php

class AuthController {
    private $projectId = 'hotel-booking-a3022'; 
    private $apiUrl;
    private const FIELD_EMAIL = 'email';
    private const FIELD_PASSWORD = 'password';
    private const FIELD_FIRST_NAME = 'firstName';
    private const FIELD_LAST_NAME = 'lastName';
    private const ERROR_MISSING_CREDENTIALS = "Email и пароль обязательны";
    private const ERROR_USER_NOT_FOUND = "Пользователь с таким email не найден";
    private const ERROR_INVALID_PASSWORD = "Неверный пароль";
    private const ENDPOINT_USERS = 'users';
    private const ENDPOINT_RUN_QUERY = ':runQuery';

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
    
    private function buildUserQueryByEmail(string $email): array
    {
        return [
            'structuredQuery' => [
                'from'  => [['collectionId' => self::ENDPOINT_USERS]],
                'where' => [
                    'fieldFilter' => [
                        'field' => ['fieldPath' => self::FIELD_EMAIL],
                        'op'    => 'EQUAL',
                        'value' => ['stringValue' => $email]
                    ]
                ],
                'limit' => 1 
            ]
        ];
    }
    
    private function buildUserResponse(array $userDoc, string $email): array
    {
        $fields = $userDoc['fields'] ?? [];
        
        return [
            "success"   => true,
            "userId"    => $this->extractIdFromName($userDoc['name']),
            "firstName" => $this->extractFieldValue($fields[self::FIELD_FIRST_NAME] ?? null) ?: '',
            "lastName"  => $this->extractFieldValue($fields[self::FIELD_LAST_NAME] ?? null) ?: '',
            self::FIELD_EMAIL => $email
        ];
    }

    public function login($data) {
        $email = $data[self::FIELD_EMAIL] ?? null;
        $password = $data[self::FIELD_PASSWORD] ?? null;

        if (!$email || !$password) {
            $this->sendResponse(["error" => self::ERROR_MISSING_CREDENTIALS], 400);
        }
        $queryPayload = $this->buildUserQueryByEmail($email);
        $firestoreData = $this->postToFirestore(self::ENDPOINT_RUN_QUERY, $queryPayload);

        if (empty($firestoreData) || !isset($firestoreData[0]['document'])) {
            $this->sendResponse(["error" => self::ERROR_USER_NOT_FOUND], 401);
        }

        $userDoc = $firestoreData[0]['document'];
        $fields = $userDoc['fields'] ?? [];
        
        $savedPassword = $this->extractFieldValue($fields[self::FIELD_PASSWORD] ?? null);

        if ($password === $savedPassword) {
            $this->sendResponse($this->buildUserResponse($userDoc, $email));
        } else {
            $this->sendResponse(["error" => self::ERROR_INVALID_PASSWORD], 401);
        }
    }
}
