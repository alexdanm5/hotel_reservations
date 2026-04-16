import { useNavigate } from 'react-router-dom';

import MainBtn from "../main_btn/MainBtn";

import './paymantData.scss';
import placeholderCard from '../../assets/Checkout/CreditCard.png';

const PaymantData = () => {
    const navigate = useNavigate();

    const handleGoToPayment = (e) => {
        e.preventDefault();
        // валидация данных формы и сохранение их в состояние
        navigate('/reservation_confirm');
    }

    return (
        <div className='paymantData'>
                <div className='paymantData__img'>
                    <img src={placeholderCard} alt="placeholder card" />
                </div>

                <form className='paymantData__inputs'>
                    <input type="text" placeholder='Card number' />
                    <div className='paymantData__inputs-half'>
                        <input type="text" placeholder='Expiry' />
                        <input type="text" placeholder='CVC' />
                    </div>
                    <input className="paymantData__inputs-name" type="text" placeholder='Name' />
                    <div className='paymantData__save'>
                        <input type="checkbox" id='save' />
                        <label htmlFor="save">Save this credit card</label>
                    </div>
                </form>  
                <div className='paymantData__btn'>
                    <MainBtn text="Go to Confirmation" onClick={handleGoToPayment} />
                </div>
        </div> 
    )
}

export default PaymantData;