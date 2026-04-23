import { Link } from 'react-router-dom';

import HotelCard from '../hotelCard/HotelCard';

import './hotelList.scss';

const HotelList = ({ hotels }) => {

    return (
        <div className='hotelList'>
            {hotels.map(hotel => (
                <Link to={`/hotel/${hotel.id}`} style={{'textDecoration': 'none'}} key={hotel.id}>
                    <HotelCard hotel={hotel} />
                </Link>
            ))}
        </div>
    )
}


export default HotelList;