<?php

header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8"); 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(); 
}

require_once __DIR__ . '/controllers/HotelController.php';

require_once __DIR__ . '/controllers/UserController.php';

$pathOnly = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$uriParts = explode('/', trim($pathOnly, '/'));
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
} else if ($uriParts[0] === 'search') {
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['param'])) {
        $hotelController = new HotelController();

        $searchParam = $_GET['param'];

        $hotelController->searchHotels($searchParam);
             
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Отсутствует параметр поиска"]);
    }
    
    exit();
} else if (isset($uriParts[2]) && $uriParts[2] === 'rooms_list' && isset($uriParts[1]) ) {
    $hotelId = $uriParts[1];
    $hotelController = new HotelController();

    if ($requestMethod === 'GET') {
        $hotelController->getRoomsListByHotelId($hotelId);
    }
    exit();
} else if ($uriParts[0] === 'result') {
    $hotelController = new HotelController();

    if ($requestMethod === 'GET') {
        $location = isset($_GET['location']) ? $_GET['location'] : '';
        $guests = isset($_GET['guests']) ? $_GET['guests'] : '';
        $startDate = isset($_GET['startDate']) ? $_GET['startDate'] : '';
        $endDate = isset($_GET['endDate']) ? $_GET['endDate'] : '';

        $hotelController->getHotelsByParam($location, $guests, $startDate, $endDate);
    }
    exit();
} else if ($uriParts[0] === 'user' && isset($uriParts[1]) && $uriParts[1] === 'favorit-hotels') {
    $userController = new UserController();
    $hotelController = new HotelController();

    if ($requestMethod === 'GET') {
        $favoriteHotelIds = $userController->getFavoritesHotels();
        $favoriteHotelsData = [];

        $hotelController->getSomeHotelsById($favoriteHotelIds);

    }
    exit();
} else if ($uriParts[0] === 'addToFavorites' && $requestMethod === 'POST') {
            
            $inputData = json_decode(file_get_contents('php://input'), true);

            $userController = new UserController();

            $userController->addHotelToFavorites($inputData['hotelId']);
            exit();
} else if ($uriParts[0] === 'removeFromFavorites' && $requestMethod === 'DELETE') {
            
            $inputData = json_decode(file_get_contents('php://input'), true);

            $userController = new UserController();

            $userController->removeHotelFromFavorites($inputData['hotelId']);
            exit();
} else if($uriParts[0] === 'user-info') {
    $userController = new UserController();

    if ($requestMethod === 'GET') {
        $userController->getUserInfo();
    }
    exit();
} else if ($uriParts[0] === 'changeUserData' && $requestMethod === 'PUT') {
            
            $inputData = json_decode(file_get_contents('php://input'), true);


            $userController = new UserController();

            $userController->changeUserData($inputData);
            exit();
} else if ($uriParts[0] === 'reservation' && $requestMethod === 'PUT') {
            
            $inputData = json_decode(file_get_contents('php://input'), true);

            $hotelController = new HotelController();
            $hotelController -> hotelReservation(($inputData));

            // $userController = new UserController();

            // $userController->changeUserData($inputData);
            exit();
} else if ($uriParts[0] === 'login' && $requestMethod === 'POST') {
    
    $inputData = json_decode(file_get_contents('php://input'), true);
    
    require_once 'controllers/AuthController.php';
    $authController = new AuthController();
    $authController->login($inputData);
    
    exit();
}
    

http_response_code(404);
echo json_encode(["error" => "Невідомий маршрут"]);