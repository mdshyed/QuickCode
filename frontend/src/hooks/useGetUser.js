import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '../Utils/Constant';
import { getSigninDialog, getUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { getRefresh } from '@/redux/workspaceSlice';

const useGetUser = () => {
    const {refresh} = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/getuser`, {
                withCredentials: true,
            })
            dispatch(getUser(res?.data?.user))
            console.log("getUser: ",res.data);
        } catch (error) {
            console.log("useGetuser error: ", error);
            if(error?.response?.data?.isLoginRequired){
                dispatch(getSigninDialog(true))
                dispatch(getUser(null))
                navigate('/')
            }
        }
    }

    useEffect(()=>{
        fetchUser();
    },[refresh])
}

export default useGetUser