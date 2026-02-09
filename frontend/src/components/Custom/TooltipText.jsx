import React from 'react'
import { Colors } from '@/data/Colors'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { AI_API_END_POINT } from '@/Utils/Constant'
import axios from 'axios'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RefreshCcw } from 'lucide-react'

const TooltipText = ({input, setInput, loading, setLoading}) => {
    const enhancePrompt = async () => {
        try {
            setLoading(true)
            const res = await axios.post(`${AI_API_END_POINT}/enhance`, {
                prompt: input
            }, { withCredentials: true })
            // const markdownContent = <ReactMarkdown>{res.data.result}</ReactMarkdown>
            // console.log("Enhance Prompt response: ", res.data.result)
            // console.log("Enhance Prompt markdownContent: ", markdownContent.props)
            setInput(res.data.result)
        } catch (error) {
            console.log("Enhance Prompt error: ", error)
            toast("Something went wrong! Please try again later.");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger disabled={!input}>
                        {loading ?
                            <div style={{ backgroundColor: Colors.BACKGRAOUND }} className='rounded-lg flex gap-2 items-center'>
                                <Loader2Icon className='animate-spin h-5 w-5 text-blue-400' />
                                <h2 className='text-[13px] text-gray-400'>Enhancing Prompt...</h2>
                            </div>
                            :
                            <RefreshCcw className={`h-5 w-5 ${!input ? 'text-gray-400' : 'text-blue-400 cursor-pointer'}`} onClick={() => input && enhancePrompt(input, setInput, setLoading)} />
                        }
                    </TooltipTrigger>
                    <TooltipContent>
                        <div
                            className='text-xs border border-gray-600 rounded p-1'

                        >
                            Enhance Prompt
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default TooltipText