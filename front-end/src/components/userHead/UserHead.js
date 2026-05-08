import { useSelector } from 'react-redux';
import "./head.scss";

const UserHead = () => {
    const user = useSelector((state) => state.userInfo.userInfo);

    return (
        <div className="head">
            <div className="head__img">
                <img src={user.photo} alt="User"/>
            </div>

            <div className="head__name">{user.firstName} {user.lastName}</div>
        </div>
    )
}

export default UserHead;