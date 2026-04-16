import { Link } from 'react-router-dom';

import HotelCard from '../hotelCard/HotelCard';

import './hotelList.scss';

const HotelList = () => {

    return (
        <div className='hotelList'>
            <Link to={`/hotel`} style={{'textDecoration': 'none'}}><HotelCard /></Link>
            
            <HotelCard />
            <HotelCard />
            <HotelCard />
        </div>
    )
}

export default HotelList;