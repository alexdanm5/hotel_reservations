import { useLocation, useNavigate } from 'react-router-dom';

import HeaderBack from "../header_back/HeaderBack";
import Pagination from "../pagination/Paagination";
import ReservationInfo from "../reservation_info/ReservationInfo"


const ReservationConfirm = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const handleBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1); 
        } else {
            navigate(location.state?.from || '/', { replace: true });
        }
    }

    return (
        <div style={{padding: "40px 19px 24px 18px"}}>
            <HeaderBack header={"Reservation"} onBack={handleBack} />

            <div style={{marginTop: '46px', display: 'flex', justifyContent: 'center'}}>
               <Pagination />
            </div>

            <div style={{marginTop: '52px'}}>
                <ReservationInfo />
            </div>
        </div>
    )
}

export default ReservationConfirm;