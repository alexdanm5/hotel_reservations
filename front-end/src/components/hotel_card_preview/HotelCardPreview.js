import HotelRating from '../hotel_rating/HotelRating';
// import photo from '../../assets/valer.png';
import './preview.scss';

const HotelCardPreview = ({ hotel }) => {
    const { name, photo, rating } = hotel;
    return (
        <div className='preview'>    
            <img className='preview__img' src={photo[0]} alt='hotel'/>
            <div className='preview__info'>
                <h3 className='preview__name'>{name}</h3>
                <div className='preview__rating'> <HotelRating rating={rating}/> </div>
            </div>
        </div>
    )
}

export default HotelCardPreview;
