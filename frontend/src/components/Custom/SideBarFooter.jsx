import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/Utils/Constant';
import { getSigninDialog } from '@/redux/userSlice';
import { toast } from 'sonner';
import { getRefresh as getWorkspaceRefresh } from '@/redux/workspaceSlice';
import { getRefresh as getUserRefresh } from '@/redux/userSlice';
import { Avatar } from './AppSideBar';

const SideBarFooter = () => {
    const {user, userImage} = useSelector(store=>store.user)
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const options = [
        {
            name: 'My Subsciption',
            icon: Wallet,
            action: 'pricing'
        },
        {
            name: 'Sign out',
            icon: LogOut,
            action: 'logout'
        },
    ]

    const logoutHandler = async() => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, {
                withCredentials:true
            })
            toast(res.data.message);
            // console.log("Logout",res)
            dispatch(getSigninDialog(true));
            dispatch(getUserRefresh())
            dispatch(getWorkspaceRefresh())
            navigate('/')
        } catch (error) {
            console.log("Logout error: ", error);
            if(error?.response?.data?.isLoginRequired){
                dispatch(getSigninDialog(true));
                navigate('/');
            }
        }
    }


    return (
        <div className=''>
            <Button
                onClick={() => navigate('/pricing')}
                variant='ghost'
                className='w-full flex justify-start items-center my-3 cursor-pointer'
            >
                <Wallet/>My Subsciption
            </Button>

            <Button
                onClick={logoutHandler}
                variant='ghost'
                className='w-full flex justify-start items-center my-3 cursor-pointer'
            >
                <LogOut/>Sign out
            </Button>


            <div className='flex gap-3 items-center border-t border-gray-600'>
                {/* <img src={userImage} height={30} width={30} alt="user" className='rounded-full cursor-pointer mt-3' /> */}
                <div className='rounded-full cursor-pointer mt-3'>
                    <Avatar name={user.name} />
                </div>
                <h2 className='font-bold mt-3'>{user?.name}</h2>
            </div>
        </div>
    )
}

export default SideBarFooter