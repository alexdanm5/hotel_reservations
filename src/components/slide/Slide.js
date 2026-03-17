import HotelRating from '../hotel_rating/HotelRating';
import hotel from '../../assets/hotel.png';
import './slide.scss';

function Slide() {

    return (
        <div id='' className='slide'>
            <img src={hotel} alt="Hotel" className='slide__img'/>
            <div className='slide__content'>
                <h3 className='slide__name'>Lux Hotel with a Pool</h3>
                <div className='slide__info'>
                    <div className='slide__location'>Dubai</div>
                    <div className='slide__wrapper'>
                        <div className='slide__price'>$700~</div>
                        <div className='slide__rating'>
                            <HotelRating />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Slide;