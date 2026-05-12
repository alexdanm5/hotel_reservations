import { useSelector } from 'react-redux';

import SideBarPanel from '../side_bar_panel/SideBarPanel';
import UserPage from "../user_page/UserPage";
import LogInPage from "../logIn_page/LogInPage"

const User = () => {
    const isLogIn = useSelector(state => state.authorization.trigger);

    const content = isLogIn ? <UserPage/> : <LogInPage/>
    return(
        <div style={{padding: "40px 0px 100px 0", height: "100vh"}}>
            {content}

            <SideBarPanel />
        </div>
    )
}

export default User;