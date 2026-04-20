
import './mainBtn.scss';

const MainBtn = ({ text, onClick }) => {
    return (
        <button className='mainBtn' onClick={onClick}>
            {text}
        </button>
    )
}

export default MainBtn;