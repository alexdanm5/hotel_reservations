
import './hotelRating.scss';

const HotelRating = ({ rating }) => {

    return (
        <div className='hotelRating'>
            <div className='slide__rating'>
                <span className='slide__rating-number'>{rating}</span>
                <span className='slide__rating-star'>★</span>
            </div>
        </div>
    )
}

export default HotelRating;