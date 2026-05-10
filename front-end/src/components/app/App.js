import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';

const Home = lazy(() => import('../pages/Home'));
const Result = lazy(() => import('../pages/Result'));
const Search = lazy(() => import('../pages/Search'));

const User = lazy(() => import('../pages/User'));
const UserHendler = lazy(() => import('../user_hendler/UserHendler'));
const FavoritHotels = lazy(() => import('../favorit_hotels/FavoritHotels'));

const Notifications = lazy(() => import('../pages/Notifications'));
const Hotel = lazy(() => import('../pages/Hotel'));
const RoomsList = lazy(() => import('../pages/Rooms_list'));
const ReservationPersonalData = lazy(() => import('../pages/Reservation_personal_data'));
const ReservationPaymantData = lazy(() => import('../pages/Reservation_paymant_data'));
const ReservationConfirm = lazy(() => import('../pages/Reservation_confirm'));

const Page404 = lazy(() => import('../pages/404'));





function App() {
  return (
    <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/notifications' element={<Notifications />} />

            <Route path='/user' element={<User />} >
              <Route index element={<UserHendler />} />
              <Route path='favorit-hotels' element={<FavoritHotels />} />
            </Route>
            
            <Route path='/result' element={<Result />} />
            <Route path='/hotel/:id' element={<Hotel />} />
            <Route path='/hotel/:id/rooms_list' element={<RoomsList />} />
            <Route path='/reservation_personal_data' element={<ReservationPersonalData />} />
            <Route path='/reservation_paymant_data' element={<ReservationPaymantData />} />
            <Route path='/reservation_confirm' element={<ReservationConfirm />} />

            <Route path='*' element={<Page404/>}/>
          </Routes>
        </Suspense>
    </div>
  );
}

export default App;
