import HotelRating from '../hotel_rating/HotelRating';
import photo from '../../assets/valer.png';
import './preview.scss';

const HotelCardPreview = () => {

    return (
        <div className='preview'>    
            <img className='preview__img' src={photo} alt='hotel'/>
            <div className='preview__info'>
                <h3 className='preview__name'>Hotel Name</h3>
                <div className='preview__rating'> <HotelRating /> </div>
            </div>
        </div>
    )
}

export default HotelCardPreview;
