import arrow from "../../assets/arrow/chevron-left.png";
import './headerBack.scss';

const HeaderBack = ({header, onBack}) => {
    return (
        <div className='headerBack'>
                <div onClick={onBack} className='headerBack__back'>
                    <img src={arrow} alt="Back" />
                </div>
                <div className='headerBack__text'>{header}</div>
        </div>
    )
}

export default HeaderBack;