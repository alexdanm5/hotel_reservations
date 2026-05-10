import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useGetUserInfoQuery } from '../../store/userApi';
import { setUserInfo } from '../../store/userInfoSlice';

import spiner from '../../assets/Spinner.svg';

import './App.scss';

const Home = lazy(() => import('../pages/Home'));
const Result = lazy(() => import('../pages/Result'));
const Search = lazy(() => import('../pages/Search'));

const User = lazy(() => import('../pages/User'));
const UserHendler = lazy(() => import('../user_hendler/UserHendler'));
const FavoritHotels = lazy(() => import('../favorit_hotels/FavoritHotels'));
const UserSettings = lazy(() => import('../user_settings/UserSettings'));

const Notifications = lazy(() => import('../pages/Notifications'));
const Hotel = lazy(() => import('../pages/Hotel'));
const RoomsList = lazy(() => import('../pages/Rooms_list'));
const ReservationPersonalData = lazy(() => import('../pages/Reservation_personal_data'));
const ReservationPaymantData = lazy(() => import('../pages/Reservation_paymant_data'));
const ReservationConfirm = lazy(() => import('../pages/Reservation_confirm'));

const Page404 = lazy(() => import('../pages/404'));





function App() {
  const dispatch = useDispatch();
    const { data: userInfo, isLoading } = useGetUserInfoQuery();

    useEffect(() => {
        if (userInfo) {
            dispatch(setUserInfo(userInfo));
        }
    }, [userInfo, dispatch]);
    
    if(isLoading) {return <img style={{'margin': '40px auto 0 auto'}} src={spiner} alt='spinner' />;}

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
              <Route path='settings' element={<UserSettings />} />
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
