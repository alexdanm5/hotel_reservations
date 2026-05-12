import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useReservationHotelMutation } from '../../store/hotelsApi'

import HotelCardPreview from "../hotel_card_preview/HotelCardPreview";
import MainBtn from "../main_btn/MainBtn";

import './info.scss';

const ReservationInfo = () => {
    const navigate = useNavigate();

    const [reservationHotel] = useReservationHotelMutation();

    const reservationData = useSelector(state => state.hotelReservationData);
    
    const handleCompleteReservation = () => {
        reservationHotel(reservationData).unwrap();
        navigate('/'); 
    };

    useEffect(() => {
 
        if (!reservationData || Object.keys(reservationData).length === 0) {
            navigate('/', { replace: true });
        }
    }, [reservationData, navigate]);

    if (!reservationData || Object.keys(reservationData).length === 0) {
        return null; 
    }

    const calculateNights = (checkIn, checkOut) => {
        const date1 = new Date(checkIn);
        const date2 = new Date(checkOut);

        const diffInTime = Math.abs(date2.getTime() - date1.getTime());

        const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)); 

        return diffInDays;
    };
    

    return (
        <div className="info">
            <HotelCardPreview hotel={reservationData} />
            <div className='info__details'>
                <div className='info__people'>{reservationData.guests} People</div>
                <div className='info__room'>{reservationData.type}</div>
                <div className='info__nights'>{calculateNights(reservationData.startDate, reservationData.endDate)} nights</div>
                <div className='info__date'>{reservationData.startDate} to {reservationData.endDate}</div>
            </div>
            <div className='info__price'>$ {calculateNights(reservationData.startDate, reservationData.endDate) * reservationData.price} USD</div>
            <div className='info__btn'>
                <MainBtn text="Complete" onClick={handleCompleteReservation} />
            </div>
        </div>
    )
}

export default ReservationInfo;