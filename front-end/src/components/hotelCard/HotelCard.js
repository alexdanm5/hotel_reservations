
import HotelCardPreview from '../hotel_card_preview/HotelCardPreview';

import './hotelCard.scss';

const HotelCard = ({hotel}) => {
    return (
        <div className='hotelCard'>
            <HotelCardPreview hotel={hotel} />
            <div className='hotelCard__detals'>
                <div className='hotelCard__text'>{hotel.description}</div>
                <div className='hotelCard__price'>$100</div>
            </div>
        </div>
    )
}

export default HotelCard;