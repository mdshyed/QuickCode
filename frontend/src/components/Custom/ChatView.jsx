import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown';
import { Colors } from '@/data/Colors';
import { ArrowRight, Loader2Icon } from 'lucide-react';
import Lookup from '@/data/Lookup';
import axios from 'axios';
import { AI_API_END_POINT, USER_API_END_POINT, WORKSPACE_API_END_POINT } from '@/Utils/Constant';
import { useNavigate, useParams } from 'react-router-dom';
import { getRefresh as getWorkspaceRefresh } from '@/redux/workspaceSlice';
import { getRefresh as getUserRefresh } from '@/redux/userSlice';
import { toast } from 'sonner';
import AppSideBar, { Avatar } from './AppSideBar';
import TooltipText from './TooltipText';


const ChatView = () => {
    const { messages } = useSelector(store => store.workspace)
    const { user } = useSelector(store => store.user)
    const [userInput, setUserInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [toolTipLoading, setToolTipLoading] = useState(false)
    const params = useParams();
    const { id } = params;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ref = useRef(null)

    const countTonken = (inputText) => {
        return inputText.trim().split(/\s+/).filter(word => word).length;
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (userInput.trim()) {
                onGenerate(userInput);
            }
        }
    };

    useEffect(() => {
        if (!messages) setLoading(true)
        else setLoading(false)

        if (messages?.length > 0) {
            const role = messages[messages?.length - 1].role;
            if (role == 'user') {
                GetAiResponse();
            }
        }
        // console.log(messages)
    }, [messages])


    const GetAiResponse = async () => {
        try {
            setLoading(true);
            const PROMPT = JSON.stringify(messages);
            const res = await axios.post(`${AI_API_END_POINT}/chat`, {
                prompt: PROMPT,
            }, { withCredentials: true })

            // console.log(res.data.result);
            const aiRes = {
                role: 'model',
                content: res.data.result
            }

            await axios.post(`${WORKSPACE_API_END_POINT}/update/messages/${id}`,
                { message: aiRes },
                { withCredentials: true }
            )

            const tokens = Number(user?.tokens) - Number(countTonken(JSON.stringify(aiRes)))
            await axios.post(`${USER_API_END_POINT}/update/tokens/`, { tokens }, { withCredentials: true })

            dispatch(getUserRefresh())
            dispatch(getWorkspaceRefresh())

        } catch (error) {
            console.log("AI Chat response error: ", error);
            toast("Something went wrong! Please try again later.");
            navigate('/')
        }
        finally {
            setLoading(false)
        }
    }


    const onGenerate = async () => {
        if (user?.tokens < 10) {
            toast("You don't have enough tokens! Upgrad to Premium");
            return;
        }
        const message = {
            role: 'user',
            content: userInput
        }
        try {
            await axios.post(`${WORKSPACE_API_END_POINT}/update/messages/${id}`,
                { message },
                { withCredentials: true }
            )
            dispatch(getWorkspaceRefresh())
            setUserInput("")
        } catch (error) {
            console.log("Update message error: ", error);
        }
    }

    const handleHeight = () => {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${Math.min(ref.current.scrollHeight, 384)}px`;
        }
    
    useEffect(() => {
        handleHeight();
    }, [userInput]);

    return (
        <div className='relative h-[90vh] flex flex-col'>

            <div className='flex-1 overflow-y-scroll scrollbar-hide '>

                {messages && messages?.map((msg, index) => (
                    <div key={index} style={{ backgroundColor: Colors.BACKGRAOUND }}
                        className='py-3 px-5 rounded-lg mb-3 flex gap-2 leading-7'>
                        {/* {msg?.role == 'user' && <img src={user?.picture} width={30} height={30} className='rounded-full'/>} */}
                        {msg?.role == 'user' &&
                            <div className='h-9 w-9'>
                                <Avatar name={user?.name} />
                            </div>}

                        <div className="flex flex-col gap-5 text-[14px] text-ghray-200">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                    </div>
                ))}

                {loading &&
                    <div style={{ backgroundColor: Colors.BACKGRAOUND }} className='p-3 rounded-lg mb-2 flex gap-2 items-start'>
                        <Loader2Icon className='animate-spin h-5 w-5' />
                        <h2>Cooking...</h2>
                    </div>
                }
            </div>

            {/* Input section  */}
            <div className='flex gap-6 items-end '>
                <div className='-ml-6 flex'>
                    {user && <AppSideBar />}
                    {/* {user && <img src={user?.picture} width={30} height={30}  className='rounded-full cursor-pointer' alt="UserImage"/>} */}
                </div>
                <div className='px-4 pb-1 border border-gray-800 rounded-xl max-w-2xl w-full mt-3'
                    style={{ backgroundColor: Colors.BACKGRAOUND }}>
                    <div className='py-2 flex justify-between gap-2'>
                        <textarea
                            ref={ref}
                            value={userInput}
                            onChange={(e) => {
                                setUserInput(e.target.value);
                            }}
                            onKeyDown={handleKeyDown}
                            type="text"
                            placeholder={Lookup.INPUT_PLACEHOLDER}
                            className='text-[14px] outline-none resize-none bg-transparent w-full min-h-32 max-h-96'
                        />
                        {userInput.trim() &&
                            <ArrowRight
                                onClick={() => onGenerate(userInput)}
                                className='bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer' />
                        }
                    </div>
                    <div className='pt-3'>
                        {/* <Link className='h-5 w-5 cursor-pointer' /> */}
                        <TooltipText input={userInput} setInput={setUserInput} loading={toolTipLoading} setLoading={setToolTipLoading} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatView