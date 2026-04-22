<?php

header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8"); 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(); 
}

require_once __DIR__ . '/controllers/HotelController.php';


$requestUri = $_SERVER['REQUEST_URI'];

$uriParts = explode('/', trim($requestUri, '/'));
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($uriParts[0] === 'recommend') {
    
    $hotelController = new HotelController();

    if ($requestMethod === 'GET') {
        if (isset($uriParts[0]) && $uriParts[0] === 'recommend') {
            $hotelController->getSuggestionsHotels('recommend');
        }
    }
    
    exit(); 
} else if($uriParts[0] === 'deal') {
    $hotelController = new HotelController();

    if ($requestMethod === 'GET') {
        if (isset($uriParts[0]) && $uriParts[0] === 'deal') {
            $hotelController->getSuggestionsHotels('deal');
        }
    }
    exit();
} else if ($uriParts[0] === 'hotels' && isset($uriParts[1]) ) {
    $hotelId = $uriParts[1];
    $hotelController = new HotelController();

    if ($requestMethod === 'GET') {
        $hotelController->fetchHotelData($hotelId);
    }
    exit();
}

http_response_code(404);
echo json_encode(["error" => "Неизвестный маршрут"]);