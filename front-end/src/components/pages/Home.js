import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetUserInfoQuery } from '../../store/userApi';
import { setUserInfo } from '../../store/userInfoSlice';

import Promo from '../promo/Promo';
import Recommended from '../recommend/Recommend';
import Deals from '../deals/Deals';
import SideBarPanel from '../side_bar_panel/SideBarPanel';

const  Home = () => {
    const dispatch = useDispatch();
    const { data: userInfo } = useGetUserInfoQuery();

    useEffect(() => {
        if (userInfo) {
            dispatch(setUserInfo(userInfo));
        }
    }, [userInfo, dispatch]);

    return (
        <div style={{ position: "relative", paddingBottom: "100px" }} className="home">
            <Promo />
            
            <Recommended />
            
            <Deals />
            
            <SideBarPanel />
        </div>
    );
}

export default Home;