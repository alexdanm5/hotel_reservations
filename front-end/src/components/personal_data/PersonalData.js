import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setReservationData }  from "../../store/userReservationDataSlice";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import MainBtn from "../main_btn/MainBtn";

import './personalData.scss';

const userValidationSchema = Yup.object().shape({
    firstName: Yup.string()
           .min(2, 'Must be at least 2 characters')
           .required('Required'),
    lastName: Yup.string()
            .min(2, 'Must be at least 2 characters')
            .required('Required'),
    email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
    address: Yup.string()
            .min(5, 'Must be at least 5 characters')
            .required('Required'),
    postCode: Yup.string()
            .matches(/^\d{5}(-\d{4})?$/, 'Invalid post code')
            .required('Required'),
    country: Yup.string()
            .min(2, 'Must be at least 2 characters')
            .required('Required'),
    phone: Yup.string()
            .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
            .required('Required')
});

const PersonalData = () => {
    const navigate = useNavigate();


    const dispatch = useDispatch();
    const savedDates = useSelector(state => state.userReservationData);

    const savedHotelData = useSelector(state => state.hotelReservationData);

    const handleGoToPayment = () => {
        navigate('/reservation_paymant_data');
    }

  useEffect(() => {
        if (!savedHotelData || Object.keys(savedHotelData).length === 0) {
            navigate('/', { replace: true });
        }
    }, [savedHotelData, navigate]);

    if (!savedHotelData || Object.keys(savedHotelData).length === 0) {
        return null; 
    }
    
    return (
        <Formik className="personalData"
            validationSchema={userValidationSchema}
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                postCode: '',
                country: '',
                phone: '',
                ...savedDates
            }}
            onSubmit={(values) => {
                dispatch(setReservationData(values));
                handleGoToPayment();
            }}
        >
            <Form className="personalData__form">
                <Field className="personalData__input" type="text" name="firstName" placeholder="First Name" />
                <ErrorMessage name="firstName"  className="personalData__error" />
                <Field className="personalData__input" type="text" name="lastName" placeholder="Last Name" />
                <ErrorMessage name="lastName"  className="personalData__error" />  
                <Field className="personalData__input" type="email" name="email" placeholder="Email Address" />
                <ErrorMessage name="email"  className="personalData__error" />
                <Field className="personalData__input" type="text" name="address" placeholder="Address" />
                <ErrorMessage name="address"  className="personalData__error" />
                <Field className="personalData__input" type="text" name="postCode" placeholder="Post Code" />
                <ErrorMessage name="postCode"  className="personalData__error" />
                <Field className="personalData__input" type="text" name="country" placeholder="Country" />
                <ErrorMessage name="country"  className="personalData__error" />
                <Field className="personalData__input" type="tel" name="phone" placeholder="Phone Number" />
                <ErrorMessage name="phone"  className="personalData__error" />
                <div className="personalData__btn">
                    <MainBtn text="Go to Payment" onClick={null} />
                </div>
            </Form>
            
        </Formik>
    )
}

export default PersonalData;