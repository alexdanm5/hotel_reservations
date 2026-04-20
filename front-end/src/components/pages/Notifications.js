
import Header from '../notifications_header/Header';
import List from '../notifications_list/List';
import SideBarPanel from '../side_bar_panel/SideBarPanel';

const Notifications = () => {

    return (
        <div  style={{ position: "relative", padding: "40px 0 100px 0"}}>
            <Header />

            <List />

            <SideBarPanel/>
        </div>
    )
}

export default Notifications;