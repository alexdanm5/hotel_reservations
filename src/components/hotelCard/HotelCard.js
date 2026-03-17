
import HotelRating from '../hotel_rating/HotelRating';

import photo from '../../assets/valer.png'
import './hotelCard.scss';

const HotelCard = () => {

    return (
        <div className='hotelCard'>
            <div className='hotelCard__preview'>    
                <img className='hotelCard__img' src={photo} alt='hotel'/>
                <div className='hotelCard__info'>
                    <h3 className='hotelCard__name'>Hotel Name</h3>
                    <div className='hotelCard__rating'> <HotelRating /> </div>
                </div>
            </div>
            <div className='hotelCard__detals'>
                <div className='hotelCard__text'>Standard double room</div>
                <div className='hotelCard__price'>$100</div>
            </div>
        </div>
    )
}

export default HotelCard;