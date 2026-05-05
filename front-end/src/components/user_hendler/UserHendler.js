
import { Link } from "react-router-dom";

import card from "../../assets/user/card.png";
import like from "../../assets/user/like.png";
import settings from "../../assets/user/settings.png";
import "./menu.scss";


const UserHendler = () => {


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
                    <img src={card} alt="Payment" />
                </div>
                <Link to="payment" className="menu__link">Payment</Link>
            </div>
            <div className="menu__items">
                <div className="menu__icon">
                    <img src={settings} alt="Settings" />
                </div>
                <Link to="settings" className="menu__link">Settings</Link>
            </div>
        </div>
    )
}

export default UserHendler;