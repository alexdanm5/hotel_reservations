import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import HotelCardPreview from "../hotel_card_preview/HotelCardPreview";
import MainBtn from "../main_btn/MainBtn";

import './info.scss';

const ReservationInfo = () => {
    const navigate = useNavigate();

    const handleCompleteReservation = () => {
        // Logic for completing reservation
        navigate('/'); 
    };

    const reservationData = useSelector(state => state.hotelReservationData);
    console.log(reservationData);

    return (
        <div className="info">
            <HotelCardPreview hotel={reservationData} />
            <div className='info__details'>
                <div className='info__people'>2 People</div>
                <div className='info__room'>{reservationData.type}</div>
                <div className='info__nights'>1 nights</div>
                <div className='info__date'>Jan 18 2019 to Jan 20 2019</div>
            </div>
            <div className='info__price'>$ {reservationData.price} USD</div>
            <div className='info__btn'>
                <MainBtn text="Complete" onClick={handleCompleteReservation} />
            </div>
        </div>
    )
}

export default ReservationInfo;