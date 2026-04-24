import { useNavigate } from "react-router-dom";

// import photo from "../../assets/Background.png"
import './card.scss';

const RoomCard = ({room}) => {
    const { id, type, price, photo, options } = room;
    const navigate = useNavigate();

    const handleSelect = (e) => {
        e.preventDefault();
        // Логика сохранения выбранного номера в состояние
        navigate('/reservation_personal_data');
    }


    return(
        <div className='card'>
            <div className='card__img'>
                <img src={photo} alt="Room" />
            </div>

            <div className='card__name'>{type}</div>

            <div className='card__options'>
                {options.map((option, index) => {
                    return <div key={index} className='card__option'>{option}</div>
                })}
            </div>

            <div className='card__footer'>
                <div className='card__price'>
                    <div className='card__price-money'>$ {price}</div>
                    <div className='card__price-night'>1 night</div>
                </div>
                <button className='card__btn' onClick={handleSelect}>
                    Select
                </button>
            </div>
        </div>
    )
}

export default RoomCard;