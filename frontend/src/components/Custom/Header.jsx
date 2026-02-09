import React, { useState } from 'react'
import logo from '../../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { Download, Linkedin, Rocket, Twitter, TwitterIcon, X } from 'lucide-react';
import { Colors } from '../../data/Colors';
import { Button } from '../ui/button';
import { getSigninDialog } from '@/redux/userSlice';
import { Avatar } from './AppSideBar';


const Header = () => {
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch()
    
    return (
        <div className='py-1 px-4 flex justify-between items-center pt-2'>
            <img src={logo} alt="logo" width={60} height={60} className='cursor-pointer'/>

            {user ?
            <div className='flex gap-4 items-center'>

                <label htmlFor="my-drawer" className='cursor-pointer'>
                    <Avatar name={user?.name} />
                </label>
            </div>
                :
                <div className='flex gap-4 items-center'>
                    <Button 
                        className="text-black cursor-pointer"
                        onClick={()=>dispatch(getSigninDialog(true))}
                        style={{ backgroundColor: Colors.WHITE }}>Login</Button>
                    <Button
                        className="text-black cursor-pointer"
                        onClick={()=>dispatch(getSigninDialog(true))}
                        style={{ backgroundColor: Colors.BLUE }}
                    >
                        Get Started
                    </Button>
                </div>
            }


        </div>
    )
}

export default Header