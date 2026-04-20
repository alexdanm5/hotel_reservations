import React from 'react';
import Slider from 'react-slick';
import { useGetRecommendedHotelsQuery } from '../../store/hotelsApi';

import Slide from '../slide/Slide';

import spiner from '../../assets/Spinner.svg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.scss';

const SwipeToSlide = () => {
    const settings = {
    className: "center",
    infinite: true,
    variableWidth: true,
    slidesToShow: 1,
    swipeToSlide: true,
  };
    return (
        <div className="slider-container slider">
            <Slider {...settings}>
                {/* <GettingHotels /> */}
                <div>
                    <Slide />
                </div>
                <div>
                    <Slide />
                </div>
                <div>
                    <Slide />
                </div>
                <div>
                    <Slide />
                </div>

            </Slider>
        </div>
    );
}

const GettingHotels = () => {
    const { data, error, isLoading } = useGetRecommendedHotelsQuery();

    let slideList = '';

    if (isLoading) {
        slideList = <img src={spiner} alt='spinner' />;
    } else if (error) {
        slideList = <div>Error: {error.message}</div>;
    } else {
        slideList = data.map(hotel => (
            <div key={hotel.id}>
                <Slide hotel={hotel} />
            </div>
        ));
    }

    return slideList;
}

export default SwipeToSlide;