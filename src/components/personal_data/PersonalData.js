import { useNavigate } from "react-router-dom";

import MainBtn from "../main_btn/MainBtn";

import './personalData.scss';

const PersonalData = () => {
    const navigate = useNavigate();

    const handleGoToPayment = (e) => {
        e.preventDefault();
        // валидация данных формы и сохранение их в состояние
        navigate('/reservation_paymant_data');
    }
    
    return (
        <div className="personalData">
            <form className="personalData__form">
                <input className="personalData__input" type="text" placeholder="First Name" />
                <input className="personalData__input" type="text" placeholder="Last Name" />
                <input className="personalData__input" type="email" placeholder="Email Address" />
                <input className="personalData__input" type="text" placeholder="Address" />
                <input className="personalData__input" type="text" placeholder="Post Code" />
                <input className="personalData__input" type="text" placeholder="Country" />
                <input className="personalData__input" type="tel" placeholder="Phone Number" />
            </form>
            <div className="personalData__btn">
                <MainBtn text="Go to Payment" onClick={handleGoToPayment} />
            </div>
        </div>
    )
}

export default PersonalData;