import { useGetDealsHotelsQuery } from '../../store/hotelsApi';
import { useNavigate} from 'react-router-dom';
import Slider from 'react-slick';

import Slide from '../slide/Slide';

import spiner from '../../assets/Spinner.svg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './deals.scss'; 

const Deals = (props) => {
    const { data: hotels = [], error, isLoading } = useGetDealsHotelsQuery();

    const navigate = useNavigate();

    const settings = {
            className: "center",
            infinite: true,
            variableWidth: true,
            slidesToShow: 1,
            swipeToSlide: true,
        };
    
        const status = isLoading ? <img src={spiner} alt='spinner' className='deals__spiner' /> :
            error ? <div className="deals__error">Error: {error.message || 'Помилка завантаження'}</div> :
            hotels.length === 0 ? <div className="deals__error">Готелі не знайдено.</div> : null;
        
    return (
        <div className="deals">
            <h2 className="deals__title">Deals</h2>
            {status || (
                <div className="deals__slider">
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
            )}
        </div>
    )
}

export default Deals;