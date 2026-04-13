
import arrow from "../../assets/arrow/chevron-left.png";
import './headerBack.scss';

const HeaderBack = ({header}) => {
    return (
        <div className='headerBack'>
                <a className='headerBack__back'>
                    <img src={arrow} alt="Back"/>
                </a>
                <div className='headerBack__text'>{header}</div>
        </div>
    )
}

export default HeaderBack;