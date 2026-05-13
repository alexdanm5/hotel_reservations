import { useSelector } from 'react-redux';
import { useRemoveNotificationsMutation } from '../../store/userApi';
import open from "../../assets/notifications/open.svg";
import close from "../../assets/notifications/close.svg";
import './header.scss';

const Header = () => {
    const notifications = useSelector(state => state.userInfo.userInfo.notifications);
    const currentIcon = (notifications.length === 0) ? open : close;
    const [removeNotifications] = useRemoveNotificationsMutation();

    const hendleNotifications = () => {
        if(notifications.length !== 0) {
            removeNotifications(notifications);
        }
    }

    return (
        <div className='header'>
            <button className='header__btn'
                    onClick={hendleNotifications}
            >
                <img src={currentIcon} alt="close"/>
            </button>
        </div>
    )
}

export default Header;