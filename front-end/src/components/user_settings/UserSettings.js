import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';

import { useChangeUserDataMutation } from '../../store/userApi';


// import * as Yup from 'yup';

import MainBtn from '../main_btn/MainBtn';
import arrow from "../../assets/arrow/chevron-left.png";

import './settings.scss';

const UserSettings = () => {
    const navigate = useNavigate();
    const [changeUserData] = useChangeUserDataMutation();

    const postData = (values) => {
        const changedValues = {};

        for (const key in values) {
            if (values[key] !== initialFormValues[key] && values[key].trim() !== '') {
                changedValues[key] = values[key];
            }
        }

        if (Object.keys(changedValues).length > 0) {
            changeUserData(changedValues).unwrap();
        }
        
         
    }

    const initialFormValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    return (
        <div className='settings'>
            <div className='settings__back' onClick={() => navigate(-1)}>
                <img src={arrow} alt="Back" />
            </div>

            <Formik className="settings__formik"
                initialValues={initialFormValues}
                onSubmit={async (values,{ resetForm }) => {
                    await postData(values);
                    resetForm();
                    navigate('/user');  
                }}
            >
                <Form className="settings__form">
                    <Field className="settings__input" type="text" name="firstName" placeholder="First Name" />
                    <Field className="settings__input" type="text" name="lastName" placeholder="Last Name" />
                    <Field className="settings__input" type="email" name="email" placeholder="Email Address" />
                    <Field className="settings__input" type="password" name="newPassword" placeholder="New Password" />
                    <div className="settings__btn">
                        <MainBtn text="Save Changes" onClick={null} />
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default UserSettings;