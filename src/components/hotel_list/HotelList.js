import HotelCard from '../hotelCard/HotelCard';

import './hotelList.scss';

const HotelList = () => {

    return (
        <div className='hotelList'>
            <HotelCard />
            <HotelCard />
            <HotelCard />
            <HotelCard />
        </div>
    )
}

export default HotelList;