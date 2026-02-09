import React from 'react'
import { Loader2Icon, MessageCircle, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SideBarFooter from './SideBarFooter'
import axios from 'axios'
import { toast } from 'sonner'
import { getRefresh } from '@/redux/workspaceSlice'
import { WORKSPACE_API_END_POINT } from '@/Utils/Constant'
import { Colors } from '@/data/Colors'


export const Avatar = ({ name }) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';

    return (
        <div className="w-9 h-9 rounded-full bg-yellow-200 text-green-900 flex items-center justify-center font-medium">
            {initial}
        </div>
    );
};


const AppSideBar = () => {
    const { user } = useSelector(store => store.user)
    const { userWorkspaces } = useSelector(store => store.workspace)
    const navigate = useNavigate()
    const dispatch  = useDispatch()

    const deleteWorkspace = async (id) => {
        try {
            toast("Chat deleting...");
            const res = await axios.post(`${WORKSPACE_API_END_POINT}/delete`, {
                id
            }, {withCredentials: true})
            toast(res.data.message);
            dispatch(getRefresh());
        } catch (error) {
            console.log("Workspace delete error: ", error);
        }
    }

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                {/* Moved to bottom-left */}
                <label
                    htmlFor="my-drawer"
                    className="cursor-pointer fixed bottom-4 left-7 bg-black border-none"
                >
                    {
                        // user &&  <img src={user?.picture} width={30} height={30} className='rounded-full cursor-pointer' alt="User" />
                        // : <SidebarOpen width={30} height={30} />
                        user && <Avatar name={user.name} />
                    }

                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-[#151515] text-base-content min-h-full w-80 p-4 flex flex-col justify-between">
                    <div>
                        <Link to={'/'}>
                            <Button variant='white' className='w-full cursor-pointer'> <MessageCircle className='text-black' /> Start new chat</Button>
                        </Link>
                        <h2 className='font-medium px-2 mb-4 text-lg font-md pt-4'>Your chats</h2>
                        <div className='overflow-y-scroll max-h-[64vh]'>
                            {
                                userWorkspaces ? [...userWorkspaces].reverse().map((workspace, index) =>
                                    <div
                                        key={index}
                                        className='group flex justify-between items-center px-2 py-1.5 mb-1 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-600/25'
                                    >
                                        <label htmlFor="my-drawer" className='cursor-pointer w-full'>
                                            <div
                                                onClick={() => navigate('/workspace/' + workspace?._id)}
                                                className='w-full'
                                            >
                                                    {
                                                        workspace?.messages?.[0]?.content?.split(" ").slice(0, 5).join(" ")
                                                    } 
                                            </div>
                                        </label>
                                        <Trash2
                                            height={16}
                                            width={16}
                                            className='hidden group-hover:block hover:text-red-400 cursor-pointer'
                                            onClick={() => 
                                                deleteWorkspace(workspace?._id)
                                            }
                                        />
                                    </div> 
                                ) :
                                <div style={{ backgroundColor: Colors.BACKGRAOUND }} className='px-2 py-3 rounded-lg mb-2 flex gap-2 items-start'>
                                    <Loader2Icon className='text-gray-400 animate-spin h-5 w-5' />
                                    <h2 className='text-gray-400'>Cooking...</h2>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='pt-1'>
                        <SideBarFooter />
                    </div>
                </ul>
            </div>

        </div>
    )
}

export default AppSideBar