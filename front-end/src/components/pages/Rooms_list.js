import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {useGetRoomListByHotelIdQuery} from "../../store/hotelsApi";

import HeaderBack from "../header_back/HeaderBack"
import RoomCard from "../room_card/RoomCard";

import spiner from '../../assets/Spinner.svg';

const RoomsList = () => {

    const { id } = useParams();

    const navigate = useNavigate()
    const location = useLocation();

    const goBackUrl = location.state?.from || '/';

    const handleBack = () => {
        navigate(goBackUrl);
    }

    const { data: rooms = [], isUninitialized, isFetching, error } = useGetRoomListByHotelIdQuery(id, { skip: !id });
    
    let status = null;

    if (isUninitialized) {
        status = null; 
    } else if (isFetching) {
        status = <img style={{'margin': '40px auto 0 auto'}} src={spiner} alt='spinner' />;
    } else if (error) {
        status = <div>Error: {error.message || 'Помилка завантаження'}</div>;
    } else if (rooms.length === 0) {
        status = <div>Готелі не знайдено.</div>;
    }

    return (
        <div style={{padding: "40px 19px 24px 18px", background: "#f5f5f5"}}>
            <HeaderBack header={'Beach Resort Lux'} onBack={handleBack}/>

            <div style={{marginTop: "26px", display: "flex", flexDirection: "column", gap: "19px"}}>
                {status}
                {status || rooms.map(room => <RoomCard key={room.id} room={room} />)}
            </div>
        </div>
    )
}

export default RoomsList;