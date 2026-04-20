import HeaderBack from "../header_back/HeaderBack";
import Pagination from "../pagination/Paagination";
import ReservationInfo from "../reservation_info/ReservationInfo"


const ReservationConfirm = () => {
    return (
        <div style={{padding: "40px 19px 24px 18px"}}>
            <HeaderBack header={"Reservation"} path='/reservation_paymant_data'/>

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