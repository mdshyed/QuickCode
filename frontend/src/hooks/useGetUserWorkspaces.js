import { getUserWorkspaces } from '@/redux/workspaceSlice'
import { WORKSPACE_API_END_POINT } from '@/Utils/Constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetUserWorkspaces = () => {
    const dispatch = useDispatch();
    const {refresh} = useSelector(store => store.workspace);
    
    const fetchUserWorkspaces = async() => {
        try {
            const res = await axios.get(`${WORKSPACE_API_END_POINT}/all`,{withCredentials: true});
            dispatch(getUserWorkspaces(res?.data?.workspaces));
            console.log("User workspaces: ",res.data)
        } catch (error) {
            console.log("useGetUserWorkspaces error: ", error)
            dispatch(getUserWorkspaces(null));
        }
    }

    useEffect(()=>{
        fetchUserWorkspaces();
    },[refresh])
}

export default useGetUserWorkspaces