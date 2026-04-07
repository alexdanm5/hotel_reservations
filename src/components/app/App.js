import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from '../pages/Home';
import Result from '../pages/Result';
import Search from '../pages/Search';
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
        </Routes>
      </BrowserRouter>
      {/* <Result /> */}

      {/* <ReservationPersonalData /> */}
      {/* <ReservationPaymantData /> */}
      {/* <ReservationConfirm /> */}
    </div>
  );
}

export default App;
