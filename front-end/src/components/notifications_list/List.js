import { useSelector } from 'react-redux';
import './list.scss';

const List = () => {
    const notifications = useSelector(state => state.userInfo.userInfo.notifications);
    return (
        <div className='list'>
            <ul className='list__notifications'>
                {notifications.map((item, index) => (
                    <li key={index} className='list__item'>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default List;