import React from 'react';
import Slider from 'react-slick';
import { useGetRecommendedHotelsQuery } from '../../store/hotelsApi';
import Slide from '../slide/Slide';
import spiner from '../../assets/Spinner.svg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.scss';

const SwipeToSlide = () => {
    const { data, error, isLoading } = useGetRecommendedHotelsQuery();

    const settings = {
        className: "center",
        infinite: true,
        variableWidth: true,
        slidesToShow: 1,
        swipeToSlide: true,
    };

    if (isLoading) {
        return <img src={spiner} alt='spinner' style={{ display: 'block', margin: '0 auto' }} />;
    }

    if (error) {
        return <div>Error: {error.message || 'Помилка завантаження'}</div>;
    }

    const hotels = data || [];

    if (hotels.length === 0) {
        return <div>Готелі не знайдено.</div>;
    }

    return (
        <div className="slider-container slider">
            <Slider {...settings}>
                {hotels.map(hotel => (
                    <div key={hotel.id}>
                        <Slide hotel={hotel} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SwipeToSlide;