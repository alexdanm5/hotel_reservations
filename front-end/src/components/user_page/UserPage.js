import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetUserInfoQuery } from '../../store/userApi';
import { setUserInfo } from '../../store/userInfoSlice';

import UserHead from "../userHead/UserHead";
import spiner from '../../assets/Spinner.svg';

const UserPage = () => {
    const dispatch = useDispatch();
    
    const { data: userInfo, isLoading } = useGetUserInfoQuery();

    useEffect(() => {
        if (userInfo) {
            dispatch(setUserInfo(userInfo));
        }
    }, [userInfo, dispatch]);

    if (isLoading) {
        return <img style={{'margin': '40px auto 0 auto'}} src={spiner} alt='spinner' />;
    }
    return(
        <>
            <UserHead />


            <Outlet />

        </>
    )
}

export default UserPage;