import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setReservationData }  from "../../store/userReservationDataSlice";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import MainBtn from "../main_btn/MainBtn";

import './paymantData.scss';
import placeholderCard from '../../assets/Checkout/CreditCard.png';

const cardValidationSchema = Yup.object().shape({
    cardNumber: Yup.string()
        .matches(/^\d{16}$/, 'Card number must be 16 digits')
        .required('Required'),
    expiry: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Invalid expiry date')
        .required('Required'),
    cvc: Yup.string()
        .matches(/^\d{3,4}$/, 'CVC must be 3 or 4 digits')
        .required('Required'),
    name: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .required('Required')
});

const PaymantData = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const savedDates = useSelector(state => state.userReservationData);

    const handleGoToPayment = () => {
        navigate('/reservation_confirm');
    }

    return (
        <Formik className='paymantData'
            validationSchema={cardValidationSchema}
            initialValues={{
                cardNumber: '',
                expiry: '',
                cvc: '',
                name: '',
                ...savedDates
            }}
            onSubmit={(values) => {
                dispatch(setReservationData(values));
                handleGoToPayment();
            }}
        >

            <Form className='paymantData__inputs'>
                <div className='paymantData__img'>
                    <img src={placeholderCard} alt="placeholder card" />
                </div>
                <Field type="text" placeholder='Card number' name="cardNumber" />
                <ErrorMessage name="cardNumber" className="paymantData__error" />
                <div className='paymantData__inputs-half'>
                    <Field type="text" placeholder='Expiry' name="expiry" />
                    <ErrorMessage name="expiry" className="paymantData__error" />
                    <Field type="text" placeholder='CVC' name="cvc" />
                    <ErrorMessage name="cvc" className="paymantData__error" />
                </div>
                <Field className="paymantData__inputs-name" type="text" placeholder='Name' name="name" />
                <ErrorMessage name="name" className="paymantData__error" />
                <div className='paymantData__save'>
                    <Field type="checkbox" id='save' />
                    <label htmlFor="save">Save this credit card</label>
                </div>
                <div className='paymantData__btn'>
                    <MainBtn text="Go to Confirmation" onClick={null} />
                </div>
            </Form>  
                
        </Formik> 
    )
}

export default PaymantData;