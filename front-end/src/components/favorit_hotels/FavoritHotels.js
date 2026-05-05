

import HotelList from '../hotel_list/HotelList';
import './favorit.scss';

const FavoritHotels = () => {

    return (
        <div className='favorit'>
            <HotelList hotels={[]}/>
        </div>
    )
}

export default FavoritHotels;