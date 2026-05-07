import { useNavigate } from 'react-router-dom';

import { useGetUserFavouritesQuery } from '../../store/userApi';

import HotelList from '../hotel_list/HotelList';

import spiner from '../../assets/Spinner.svg';
import arrow from "../../assets/arrow/chevron-left.png";

import './favorit.scss';

const FavoritHotels = () => {
    const { data: favoriteHotels = [], isUninitialized, isFetching, error } = useGetUserFavouritesQuery();

    let status = null;
    
    if (isUninitialized) {
        status = null; 
    } else if (isFetching) {
        status = <img style={{'margin': '40px auto 0 auto'}} src={spiner} alt='spinner' />;
    } else if (error) {
        status = <div>Error: {error.message || 'Помилка завантаження'}</div>;
    } else if (favoriteHotels.length === 0) {
        status = <div>Готелі не знайдено.</div>;
    }

    console.log('Favorite Hotels:', favoriteHotels);

    const navigate = useNavigate();

    return (
        <div className='favorit'>
            <div className='favorit__back' onClick={() => navigate(-1)}>
                <img src={arrow} alt="Back" />
            </div>
            <div className='favorit__content'>
                {status || <HotelList hotels={favoriteHotels}/>}
            </div>
            
        </div>
    )
}

export default FavoritHotels;