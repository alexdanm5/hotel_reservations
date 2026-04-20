
// import open from "../../assets/notifications/open.svg";
import close from "../../assets/notifications/close.svg";
import './header.scss';

const Header = () => {

    return (
        <div className='header'>
            <button className='header__btn'>
                <img src={close} alt="close"/>
            </button>
        </div>
    )
}

export default Header;