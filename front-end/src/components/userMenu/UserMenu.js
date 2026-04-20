
import card from "../../assets/user/card.png";
import like from "../../assets/user/like.png";
import settings from "../../assets/user/settings.png";
import "./menu.scss";


const UserMenu = () => {

    return(
        <div className="menu">
            <div className="menu__items">
                <div className="menu__icon">
                    <img src={like} alt="Favourites" />
                </div>
                <div className="menu__link">Your favourites</div>
            </div>
            <div className="menu__items">
                <div className="menu__icon">
                    <img src={card} alt="Payment" />
                </div>
                <div className="menu__link">Payment</div>
            </div>
            <div className="menu__items">
                <div className="menu__icon">
                    <img src={settings} alt="Settings" />
                </div>
                <div className="menu__link">Settings</div>
            </div>
        </div>
    )
}

export default UserMenu;