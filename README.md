# Hotel Booking App
Сучасний веб-додаток для пошуку та бронювання готелів, розроблений з використанням React (Frontend) та чистого PHP (Backend), інтегрований з базою даних Firebase Firestore через REST API.

## Функціонал програми
Додаток надає користувачам повний цикл взаємодії з платформою бронювання:
- Автентифікація користувачів: Вхід у систему з перевіркою даних через базу Firestore.
  - Файли: [LogInPage.js](https://github.com/alexdanm5/hotel_reservations/blob/main/front-end/src/components/logIn_page/LogInPage.js), [AuthController.php](https://github.com/alexdanm5/hotel_reservations/blob/main/back-end/controllers/AuthController.php)
- Пошук та фільтрація готелів: Пошук готелів за назвою, містом, датами та кількістю гостей із перевіркою доступності вільних номерів на обрані дати.
  - Файли: [HotelBookingForm.js](https://github.com/alexdanm5/hotel_reservations/blob/main/front-end/src/components/hotel_booking_form/HotelBookingForm.js), [HotelController.php](https://github.com/alexdanm5/hotel_reservations/blob/main/back-end/controllers/HotelController.php)
- Бронювання номерів: Багатокроковий процес бронювання (Personal Data -> Payment Data -> Confirmation) зі збереженням стану в Redux.
  - Файли: [PersonalData.js](https://github.com/alexdanm5/hotel_reservations/blob/main/front-end/src/components/personal_data/PersonalData.js), [userReservationDataSlice.js](https://github.com/alexdanm5/hotel_reservations/blob/main/front-end/src/store/userReservationDataSlice.js)
- Керування профілем та Вибраним: Додавання готелів до списку улюблених, редагування особистих даних.
  - Файли: [FavoritHotels.js](https://github.com/alexdanm5/hotel_reservations/blob/main/front-end/src/components/favorit_hotels/FavoritHotels.js), [UserController.php](https://github.com/alexdanm5/hotel_reservations/blob/main/back-end/controllers/UserController.php)
- Система повідомлень: Отримання сповіщень про успішне бронювання.
  - Файли: [Header.js](https://github.com/alexdanm5/hotel_reservations/blob/main/front-end/src/components/notifications_header/Header.js) (UI), [UserController.php](https://github.com/alexdanm5/hotel_reservations/blob/main/back-end/controllers/UserController.php) (Логіка відправки)

## Процес запуску локально
Для запуску проєкту на вашому комп'ютері виконайте наступні кроки:
1. Запуск Backend (PHP)
   1. Переконайтеся, що у вас встановлено PHP (версії 7.4 або вище).
   2. Відкрийте термінал і перейдіть до папки з бекендом (де знаходиться файл index.php).
   3. Запустіть вбудований PHP-сервер на порту 8000: **php -S localhost:8000**
2. Запуск Frontend (React)
   1. Відкрийте нове вікно терміналу та перейдіть у кореневу папку frontend-додатка.
   2. Встановіть необхідні залежності: **npm install**
   3. Запустіть React-додаток: **npm start**

_______

## Programming Principles
У цьому проєкті дотримано ключових принципів розробки програмного забезпечення для забезпечення чистоти та розширюваності коду:
1. SRP (Single Responsibility Principle - Принцип єдиної відповідальності)
   - Кожен клас і компонент виконує лише одну задачу. Наприклад, router.php займається виключно маршрутизацією, а **HotelController.php** — лише бізнес-логікою роботи з готелями.
2. DRY (Don't Repeat Yourself - Не повторюйся)
   - Логіка виконання HTTP-запитів до бази даних у PHP винесена в окремі методи-хелпери (**fetchFromFirestore**, **commitToFirestore**), що дозволило уникнути дублювання **file_get_contents** і налаштувань контексту.
3. SoC (Separation of Concerns - Розділення інтересів)
   - Frontend чітко розділений на UI-компоненти (View) та управління станом/API-запитами (Redux Toolkit + RTK Query у файлах **hotelsApi.js**, **userApi.js**).
4. KISS (Keep It Simple, Stupid - Роби це простіше)
   - Замість використання важких ORM або фреймворків для PHP, інтеграція з Firebase реалізована через прямі REST API запити, що робить бекенд максимально легким, швидким та зрозумілим.
5. Composition over Inheritance (Композиція замість успадкування)
   - У React-частині складні інтерфейси будуються з дрібних незалежних компонентів (наприклад, **HotelCard** містить всередині **HotelCardPreview**, **HotelRating**), замість використання складних ієрархій наслідування класів.
## Design Patterns
У коді використано наступні патерни проєктування:
1. Front Controller (Фронт-контролер)
   - Файл: [index.php](https://github.com/alexdanm5/hotel_reservations/blob/main/back-end/index.php)
   - Опис: Єдина точка входу для всіх запитів до бекенду. Цей файл перехоплює всі запити, налаштовує заголовки CORS, обробляє базові параметри URI і лише після цього передає управління маршрутизатору. Це централізує налаштування безпеки та HTTP-відповідей.
2. Controller (Контролер)
   - Файли: [HotelController.php](https://github.com/alexdanm5/hotel_reservations/blob/main/back-end/controllers/HotelController.php), [UserController.php](https://github.com/alexdanm5/hotel_reservations/blob/main/back-end/controllers/UserController.php)
   - Опис: Патерн розділення бізнес-логіки. Контролери інкапсулюють у собі всі операції, пов'язані з конкретною сутністю (Готелі, Користувачі). Вони отримують вхідні дані від маршрутизатора, звертаються до БД і формують JSON-відповідь для Frontend-у.
3. Data Mapper (Перетворювач даних) / Adapter
   - Файл: Будь-який контролер, метод [extractFieldValue($field)](https://github.com/alexdanm5/hotel_reservations/blob/main/back-end/controllers/UserController.php#L47)
   - Опис: Firestore повертає дані у дуже специфічному та складному форматі (наприклад, ['stringValue' => 'Text']). Метод extractFieldValue діє як мапер, рекурсивно перетворюючи складну структуру Firebase у плоскі, звичні PHP-масиви та об'єкти, приховуючи цю складність від решти бізнес-логіки.

## Refactoring Techniques
Під час розробки та вдосконалення коду були застосовані такі техніки рефакторингу:
1. Extract Method (Відокремлення методу)
   - Повторюваний код формування HTTP-відповідей (**http_response_code** + **echo json_encode**) був винесений в окремий приватний метод **sendResponse()**.
2. Consolidate Duplicate Conditional Fragments (Об'єднання дубльованих фрагментів в умовних операторах)
   - У файлі **router.php** повторювані підключення класів та обробка CORS винесені за межі блоків **if-else** (у файл index.php), що значно скоротило обсяг коду.
3. Replace Magic Numbers / Strings (Заміна магічних чисел і рядків)
   - URL-адреси бази даних (**BASE_URL** в **hotelsApi.js** та **$apiUrl** в PHP-контролерах) винесені у змінні/константи на рівні конфігурації класу, а не прописані жорстко у кожному методі.
4. Replace Nested Conditional with Guard Clauses (Заміна вкладених умовних операторів на "охоронні вирази")
   - У React-компонентах (наприклад, у [RoomsList.js](https://github.com/alexdanm5/hotel_reservations/blob/main/front-end/src/components/pages/Rooms_list.js) або [Result.js](https://github.com/alexdanm5/hotel_reservations/blob/main/front-end/src/components/pages/Result.js)) замість великих конструкцій **if...else** для рендеру використовуються ранні повернення стану завантаження або помилки **(if(isLoading) return <Spinner/>;)**, що робить основний код рендеру чистішим.
5. Rename Method / Variable (Перейменування методів та змінних)
   - Змінні та функції були перейменовані для максимальної самодокументації коду (наприклад, замість загальних **$data** використовуються **$filteredByLocation**, **$availableRoomIds** тощо), щоб наміри коду були зрозумілі без додаткових коментарів.
