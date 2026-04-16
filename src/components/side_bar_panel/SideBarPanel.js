import React from 'react';
import { NavLink } from 'react-router-dom';


import HomeIcon from '../../assets/panel_icons/HomeIcon';
import SearchIcon from '../../assets/panel_icons/SearchIcon';
import NotificationIcon from '../../assets/panel_icons/NotificationIcon';
import UserIcon from '../../assets/panel_icons/UserIcon';
import './panel.scss';

const SideBarPanel = () => {
    return (
        <div className='panel'>
            <NavLink className='panel__link' to='/'><span><HomeIcon /></span></NavLink>
            <NavLink className='panel__link' to='/search'><span><SearchIcon /></span></NavLink>
            <NavLink className='panel__link' to='/notifications'><span><NotificationIcon /></span></NavLink>
            <NavLink className='panel__link' to='/user'><span><UserIcon /></span></NavLink>
        </div>
    )
}

export default SideBarPanel;