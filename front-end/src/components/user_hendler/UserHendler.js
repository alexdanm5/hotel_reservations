
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setAuthorization } from '../../store/authorizationSlice';
import { clearUserInfo } from "../../store/userInfoSlice";

import MainBtn from "../main_btn/MainBtn";

import like from "../../assets/user/like.png";
import settings from "../../assets/user/settings.png";
import "./menu.scss";


const UserHendler = () => {

    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(setAuthorization(false));
        localStorage.removeItem('token');
        dispatch(clearUserInfo());
    }

    return(
        <div className="menu">
            <div className="menu__items">
                <div className="menu__icon">
                    <img src={like} alt="Favourites" />
                </div>
                <Link to="favorit-hotels" className="menu__link">Your favourites</Link>
            </div>
            <div className="menu__items">
                <div className="menu__icon">
                    <img src={settings} alt="Settings" />
                </div>
                <Link to="settings" className="menu__link">Settings</Link>
            </div>
            <div className="menu__btn">
                <MainBtn text="LogOut" onClick={logOut}/>
            </div>
        </div>
    )
}

export default UserHendler;