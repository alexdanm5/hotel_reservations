import HomeIcon from '../../assets/panel_icons/HomeIcon';
import SearchIcon from '../../assets/panel_icons/SearchIcon';
import NotificationIcon from '../../assets/panel_icons/NotificationIcon';
import UserIcon from '../../assets/panel_icons/UserIcon';
import './panel.scss';

const SideBarPanel = () => {
    return (
        <div className='panel'>
            <a className='panel__link' href="#"><span><HomeIcon /></span></a>
            <a className='panel__link' href="#"><span><SearchIcon /></span></a>
            <a className='panel__link' href="#"><span><NotificationIcon /></span></a>
            <a className='panel__link' href="#"><span><UserIcon /></span></a>
        </div>
    )
}

export default SideBarPanel;