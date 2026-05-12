
import { useDispatch } from 'react-redux';

import { useLoginUserMutation } from "../../store/userApi"

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { setAuthorization } from '../../store/authorizationSlice';

import MainBtn from "../main_btn/MainBtn";

import spiner from '../../assets/Spinner.svg';

import './log.scss';


const userValidationSchema = Yup.object().shape({

    email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
    password: Yup.string()
            .required('Required'),
});

const LogInPage = () => {
    const [loginUser, {isLoading}] = useLoginUserMutation();

    const dispatch = useDispatch();

    const sendData = async (values) => {
        try {
            const response = await loginUser(values).unwrap();

            const token = response.userId;

            localStorage.setItem('token', token);
            dispatch(setAuthorization(true));

        } catch (error) {
            console.error("Authorization error:", error);
        }
    }

    if(isLoading) {return <img style={{'margin': '40px auto 0 auto'}} src={spiner} alt='spinner' />;}

    return(
        <Formik className="log"
            validationSchema={userValidationSchema}
            initialValues={{
                email: '',
                password: '',
            }}
            onSubmit={(values) => {
                sendData(values);
            }}
        >
            <Form className="log__form">
                <Field className="log__input" type="email" name="email" placeholder="Email Address" />
                <ErrorMessage name="email"  className="log__error" />
                <Field className="log__input" type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password"  className="log__error" />
                <div className="log__btn">
                    <MainBtn text="LogIn" onClick={null} />
                </div>
            </Form>
            
        </Formik>
    )
}

export default LogInPage;