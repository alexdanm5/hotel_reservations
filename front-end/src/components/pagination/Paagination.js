import { useLocation } from 'react-router-dom';
import './pagination.scss'

const Pagination = () => {
    const location = useLocation();
    let stepPay = '';
    let stepConfirm = '';
    if(location.pathname === '/reservation_paymant_data') {
        stepPay = 'active';
    }else if(location.pathname === '/reservation_confirm') {
        stepConfirm = 'active';
    }
    console.log(location.pathname);
    return (
        <div className='pagination'>
            <div className='pagination__item active'>1</div>
            <span className={`pagination__spn ${stepPay} ${stepConfirm}`}></span>
            <div className={`pagination__item ${stepPay} ${stepConfirm}`}>2</div>
            <span className={`pagination__spn ${stepConfirm}`}></span>
            <div className={`pagination__item ${stepConfirm}`}>3</div>
        </div>
    )
}

export default Pagination;