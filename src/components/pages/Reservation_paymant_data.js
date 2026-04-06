import HeaderBack from "../header_back/HeaderBack"
import Pagination from "../pagination/Paagination"
import PaymantData from "../paymant_data/PaymantData"

const ReservationPaymantData = () => {
    return (
        <div style={{padding: "40px 19px 24px 18px"}}>
            <HeaderBack />

            <div style={{marginTop: '46px', display: 'flex', justifyContent: 'center'}}>
               <Pagination />
            </div>

            <div style={{marginTop: '52px'}}>
                <PaymantData />
            </div>
        </div>
    )
}

export default ReservationPaymantData;