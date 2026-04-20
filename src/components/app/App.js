import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';

const Home = lazy(() => import('../pages/Home'));
const Result = lazy(() => import('../pages/Result'));
const Search = lazy(() => import('../pages/Search'));
const User = lazy(() => import('../pages/User'));
const Notifications = lazy(() => import('../pages/Notifications'));
const Hotel = lazy(() => import('../pages/Hotel'));
const RoomsList = lazy(() => import('../pages/Rooms_list'));
const ReservationPersonalData = lazy(() => import('../pages/Reservation_personal_data'));
const ReservationPaymantData = lazy(() => import('../pages/Reservation_paymant_data'));
const ReservationConfirm = lazy(() => import('../pages/Reservation_confirm'));





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/user' element={<User />} />
          <Route path='/result' element={<Result />} />
          <Route path='/hotel' element={<Hotel />} />
          <Route path='/hotel/rooms_list' element={<RoomsList />} />
          <Route path='/reservation_personal_data' element={<ReservationPersonalData />} />
          <Route path='/reservation_paymant_data' element={<ReservationPaymantData />} />
          <Route path='/reservation_confirm' element={<ReservationConfirm />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
