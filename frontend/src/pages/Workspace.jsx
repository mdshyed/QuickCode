import ChatView from '@/components/Custom/ChatView';
import CodeView from '@/components/Custom/CodeView';
import WorkspaceHeader from '@/components/Custom/WorkspaceHeader';
import useGetUser from '@/hooks/useGetUser';
import useGetUserWorkspaces from '@/hooks/useGetUserWorkspaces';
import useGetWorkspace from '@/hooks/useGetWorkspace';
import { store } from '@/redux/store';
import { getMessages, getWorkspace } from '@/redux/workspaceSlice';
import { WORKSPACE_API_END_POINT } from '@/Utils/Constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner';

const Workspace = () => {
  const { workspace, messages } = useSelector(store => store.workspace)
  const { user } = useSelector(store => store.user)
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useGetUser();
  useGetWorkspace(id);
  useGetUserWorkspaces()


  //If user is not the owner of the workspace
  useEffect(() => {
    if(user && workspace && workspace?.user!=user?._id){
      // console.log("user: ",user?._id)
      // console.log("workspace: ",workspace?.user)
      navigate('/')
    }
  }, [workspace, id, user])


  return (
    <div className='h-screen'>
      <WorkspaceHeader />
      <div className='pl-20 pr-4 grid grid-cols-1 md:grid-cols-3 gap-10'>
        <ChatView />
        <div className='col-span-2'>
          <CodeView />
        </div>
      </div>
    </div>
  )
}

export default Workspace