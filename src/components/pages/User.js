
import UserHead from "../userHead/UserHead"
import UserMenu from "../userMenu/UserMenu";
import SideBarPanel from '../side_bar_panel/SideBarPanel';

const User = () => {

    return(
        <div style={{padding: "40px 19px 100px 0", height: "100vh"}}>
            <UserHead />

            <UserMenu />
            <SideBarPanel />
        </div>
    )
}

export default User;