import React from 'react';
import HotelRating from '../hotel_rating/HotelRating';
import hotelPhoto from '../../assets/hotel.png';
import './slide.scss';

function Slide({hotel}) {

    const { name, location, rating = 0 } = hotel;

    return (
        <div className='slide'>
            <img src={hotelPhoto} alt="Hotel" className='slide__img'/>
            <div className='slide__content'>
                <h3 className='slide__name'>{name}</h3>
                <div className='slide__info'>
                    <div className='slide__location'>{location}</div>
                    <div className='slide__wrapper'>
                        <div className='slide__price'>$100</div>
                        <div className='slide__rating'>
                            <HotelRating rating={rating} />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Slide;