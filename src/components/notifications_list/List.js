
import './list.scss';

const List = () => {

    return (
        <div className='list'>
            <ul className='list__notifications'>
                <li className='list__item'>Please rate your stay at Venice Royal, Venice, Italy. 1</li>
                <li className='list__item'>Your stay at Hotel Venice Royal is booked in 2 days!</li>
                <li className='list__item list__active'>You have earned 3000 loyalty points! See how to use them here.</li>
            </ul>
        </div>
    )
}

export default List;