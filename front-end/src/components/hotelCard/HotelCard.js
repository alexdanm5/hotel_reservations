
import HotelCardPreview from '../hotel_card_preview/HotelCardPreview';

import './hotelCard.scss';

const HotelCard = () => {

    return (
        <div className='hotelCard'>
            <HotelCardPreview />
            <div className='hotelCard__detals'>
                <div className='hotelCard__text'>Standard double room</div>
                <div className='hotelCard__price'>$100</div>
            </div>
        </div>
    )
}

export default HotelCard;