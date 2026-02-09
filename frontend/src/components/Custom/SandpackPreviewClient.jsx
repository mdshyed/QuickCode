import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
const SandpackPreviewClient = () => {
    const {deploy} = useSelector(store=>store.workspace)
    const previewRef = useRef();
    const { sandpack } = useSandpack();

    // useEffect(()=>{
    //     GetSandpackClient()
    // },[sandpack && deploy])

    const GetSandpackClient = async() => {
        const client = previewRef.current?.getClient();
        if(client){
            // console.log("client: ",client)
            const result  = await client.getCodeSandboxURL();
            // window.open(`https://${result.sandboxId}.csb.app/` , '_blank');
            // console.log("result: ",result)
        }
    }

    return (
        <div className='w-full'>
            <SandpackPreview
                ref={previewRef}
                style={{ height: '83.5vh' }} 
                showNavigator={true} />
        </div>
    )
}

export default SandpackPreviewClient