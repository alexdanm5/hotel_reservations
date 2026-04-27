
import './mainBtn.scss';

const MainBtn = ({ text, onClick }) => {
    return (
        <button className='mainBtn' onClick={onClick} type='submit'>
            {text}
        </button>
    )
}

export default MainBtn;