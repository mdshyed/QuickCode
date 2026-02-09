import { Colors } from '@/data/Colors'
import Lookup from '@/data/Lookup'
import { ArrowRight, ArrowRightCircle, Loader2Icon, MessageCircle, RefreshCcw, SidebarOpen } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import LoginDialog from '../Auth/LoginDialog'
import { useDispatch, useSelector } from 'react-redux'
import { getSigninDialog } from '@/redux/userSlice'
import axios from 'axios'
import { AI_API_END_POINT, WORKSPACE_API_END_POINT } from '@/Utils/Constant'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import AppSideBar from './AppSideBar'
import TooltipText from './TooltipText'
import ReactMarkdown from 'react-markdown'



const Hero = () => {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ref = useRef(null)

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) {
                onGenerate(input);
            }
        }
    };

    const onGenerate = async (input) => {
        try {
            if (!user) {
                dispatch(getSigninDialog(true));
            }
            if (user?.tokens < 10) {
                toast("You don't have enough tokens! Upgrad to Premium");
                return;
            }
            const message = {
                role: 'user',
                content: input
            }
            const res = await axios.post(`${WORKSPACE_API_END_POINT}/create`, {
                message
            }, { withCredentials: true })

            // dispatch(getMessages(res.data.workspace.messages))
            // console.log("first message: ", message)
            navigate('workspace/' + res.data.workspace._id)
        } catch (error) {
            console.log("Generate workspace error: ", error)
            toast("Something went wrong! Please try again later.");
            navigate('/')
        }
    }

    const handleHeight = () => {
        ref.current.style.height = 'auto';
        ref.current.style.height = `${Math.min(ref.current.scrollHeight, 224)}px`;
    }

    useEffect(() => {
        handleHeight();
    }, [input]);

    return (
        <div className='w-full'>
            <div className='flex flex-col gap-3 items-center justify-center mt-46'>
                <h2 className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-bold text-5xl'>{Lookup.HERO_HEADING}</h2>
                <p className='text-gray-400'>{Lookup.HERO_DESC}</p>
                <div className='px-4 pb-1 border border-gray-800 rounded-md max-w-lg w-full mt-3'
                    style={{ backgroundColor: Colors.BACKGRAOUND }}>
                    <div className='py-2 flex justify-between gap-2'>
                        <textarea
                            ref={ref}
                            className='text-[14px] w-full outline-none resize-none bg-transparent min-h-28 max-h-56'
                            placeholder={Lookup.INPUT_PLACEHOLDER}
                            value={input}
                            type="text"
                            onKeyDown={handleKeyDown}
                            onChange={(e) => {
                                setInput(e.target?.value);
                            }}
                        />
                        {/* <ReactMarkdown>{input}</ReactMarkdown> */}
                        {
                            input &&
                            <ArrowRight
                                onClick={() => onGenerate(input)}
                                className='bg-blue-500 p-2 h-8 w-10 rounded-md cursor-pointer' />
                        }
                    </div>

                    {/* ToopTip Text  */}
                    <div className='pt-3'>
                        <TooltipText input={input} setInput={setInput} loading={loading} setLoading={setLoading} />
                    </div>

                </div>

                <div className='flex flex-wrap max-w-2xl mt-10 gap-3 justify-center'>
                    {
                        Lookup.SUGGSTIONS.map((item, index) =>
                            <div
                                onClick={() => onGenerate(item)}
                                className='border-1 border-gray-800 px-3 py-1 rounded-full text-xs text-gray-400 hover:text-white cursor-pointer hover:bg-gray-600/25' key={index}>
                                {item}
                            </div>
                        )
                    }
                </div>
            </div>


            {user && <AppSideBar />}
            <LoginDialog />
            
        </div>
    )
}

export default Hero