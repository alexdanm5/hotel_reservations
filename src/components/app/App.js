import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from '../pages/Home';
import Result from '../pages/Result';
import Search from '../pages/Search';
import User from '../pages/User';
import Notifications from '../pages/Notifications';
import Hotel from '../pages/Hotel';
import RoomsList from '../pages/Rooms_list';
import ReservationPersonalData from '../pages/Reservation_personal_data';
import ReservationPaymantData from '../pages/Reservation_paymant_data';
import ReservationConfirm from '../pages/Reservation_confirm';


import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/user' element={<User />} />
        </Routes>
      </BrowserRouter>
      {/* <Result /> */}

      {/* <Search /> */}
      {/* <Notifications /> */}
      {/* <User /> */}
      {/* <Hotel /> */}
      {/* <RoomsList /> */}
      {/* <ReservationPersonalData /> */}
      {/* <ReservationPaymantData /> */}
      {/* <ReservationConfirm /> */}
    </div>
  );
}

export default App;
