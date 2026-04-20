import { Link } from "react-router-dom";

import arrow from "../../assets/arrow/chevron-left.png";
import './headerBack.scss';

const HeaderBack = ({header, path}) => {
    return (
        <div className='headerBack'>
                <Link to={path} className='headerBack__back'>
                    <img src={arrow} alt="Back"/>
                </Link>
                <div className='headerBack__text'>{header}</div>
        </div>
    )
}

export default HeaderBack;