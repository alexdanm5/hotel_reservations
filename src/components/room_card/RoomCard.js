import { useNavigate } from "react-router-dom";

import photo from "../../assets/Background.png"
import './card.scss';

const RoomCard = () => {
    const navigate = useNavigate();

    const handleSelect = (e) => {
        e.preventDefault();
        // Логика сохранения выбранного номера в состояние
        navigate('/reservation_personal_data');
    }


    return(
        <div className='card'>
            <div className='card__image'>
                <img src={photo} alt="Room" />
            </div>

            <div className='card__name'>Standard King Room</div>

            <div className='card__options'>
                <div className='card__option'>Refundable</div>
                <div className='card__option'>Breakfact included</div>
                <div className='card__option'>Wi-Fi</div>
                <div className='card__option'>Bath</div>
                <div className='card__option'>Air Conditioner</div>
            </div>

            <div className='card__footer'>
                <div className='card__price'>
                    <div className='card__price-money'>$ 1480</div>
                    <div className='card__price-night'>2 nights</div>
                </div>
                <button className='card__btn' onClick={handleSelect}>
                    Select
                </button>
            </div>
        </div>
    )
}

export default RoomCard;