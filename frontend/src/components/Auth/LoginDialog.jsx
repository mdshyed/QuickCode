import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
import axios from "axios";
import { USER_API_END_POINT } from "../../Utils/Constant";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSigninDialog, getUser } from "../../redux/userSlice";
import { useEffect, useState } from "react";
import useGetUser from "../../hooks/useGetUser";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { Colors } from "@/data/Colors";
import { getRefresh as getWorkspaceRefresh } from '@/redux/workspaceSlice';
import { getRefresh as getUserRefresh } from '@/redux/userSlice';


const LoginDialog = () => {
    const { signinDialog } = useSelector(store => store.user);
    const dispatch = useDispatch()

    const handleSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/login`, {
                token: credentialResponse.credential,
            }, { withCredentials: true });

            // dispatch(getUser(res.data.user));
            // console.log(credentialResponse.credential)
            dispatch(getSigninDialog(false));
            dispatch(getUserRefresh())
            dispatch(getWorkspaceRefresh())
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    return (
        <div>

            <Dialog open={signinDialog} onOpenChange={() => dispatch(getSigninDialog(false))}>
                {/* <DialogTrigger >Open</DialogTrigger> */}
                <DialogContent style={{ backgroundColor: Colors.BACKGRAOUND }} className='border-1 border-gray-600'>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                            <div className="flex flex-col items-center justify-center gap-3 py-10">
                                <div className='font-extrabold text-4xl text-white text-center'>{Lookup.SIGNIN_HEADING}</div>
                                <div className='mt-6 text-center'>{Lookup.SIGNIN_SUBHEADING}</div>

                                <div className="mt-4">
                                    <GoogleLogin
                                        onSuccess={handleSuccess}
                                        onError={(err) => console.log("Login Failed: ",err)}
                                    />
                                </div>

                                <div className="mt-4 text-center">{Lookup.SIGNIn_AGREEMENT_TEXT}</div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default LoginDialog;