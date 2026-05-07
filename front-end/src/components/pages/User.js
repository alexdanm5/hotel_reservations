
import { Outlet } from "react-router-dom";
import UserHead from "../userHead/UserHead";
import SideBarPanel from '../side_bar_panel/SideBarPanel';

const User = () => {

    return(
        <div style={{padding: "40px 0px 100px 0", height: "100vh"}}>
            <UserHead />


            <Outlet />

            <SideBarPanel />
        </div>
    )
}

export default User;