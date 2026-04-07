import React from 'react';
import Slider from 'react-slick';

import Slide from '../slide/Slide';

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
    //     <div className='slider'>
    //         <Slide />
    //     </div>
    // )
}

export default SwipeToSlide;