import { getFileData, getMessages, getWorkspace } from '@/redux/workspaceSlice';
import { WORKSPACE_API_END_POINT } from '@/Utils/Constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const useGetWorkspace = (id) => {
    const {refresh} = useSelector(store => store.workspace);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchWorkspace = async () => {
        try {
            const res = await axios.get(`${WORKSPACE_API_END_POINT}/get/${id}`, {
                withCredentials: true
            })
            dispatch(getWorkspace(res?.data?.workspace));
            dispatch(getMessages(res?.data?.workspace?.messages));
            dispatch(getFileData(res?.data?.workspace?.fileData));
            // console.log(res.data)
        } catch (error) {
            console.log("Fetch workspace error: ", error);
            // toast("Workspace not found!");
            dispatch(getWorkspace(null));
            dispatch(getMessages(null));
            dispatch(getFileData(null));
            navigate('/');
        }
    }

    useEffect(() => {
        fetchWorkspace();
    }, [refresh, id])
}

export default useGetWorkspace