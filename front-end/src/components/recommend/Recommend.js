import { useGetRecommendedHotelsQuery } from '../../store/hotelsApi';
import Slider from 'react-slick';
import { useNavigate} from 'react-router-dom';

import Slide from '../slide/Slide';

import spiner from '../../assets/Spinner.svg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './recommend.scss'; 

const Recommended = (props) => {
    const { data: hotels = [], error, isLoading } = useGetRecommendedHotelsQuery();

    const navigate = useNavigate();

    const settings = {
        className: "center",
        infinite: true,
        variableWidth: true,
        slidesToShow: 1,
        swipeToSlide: true,
    };

    const status = isLoading ? <img src={spiner} alt='spinner' className='recommend__spiner' /> :
        error ? <div className="recommend__error">Error: {error.message || 'Помилка завантаження'}</div> :
        hotels.length === 0 ? <div className="recommend__error">Готелі не знайдено.</div> : null;
    
    return (
        <div className="recommend">
            <h2 className="recommend__title">Recommended</h2>

            {status ||

                <div className="slider-container recommended__slider">
                    <Slider {...settings}>
                        {hotels.map(hotel => (
                            <div key={hotel.id}
                                onClick={() => navigate(`/hotel/${hotel.id}`)}
                            >
                                <Slide hotel={hotel} />
                            </div>
                        ))}
                    </Slider>
                </div>
            }
        </div>
                
    )
}

export default Recommended;