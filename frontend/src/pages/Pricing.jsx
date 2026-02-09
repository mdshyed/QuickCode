import PricingModel from '@/components/Custom/PricingModel'
import { Button } from '@/components/ui/button'
import { Colors } from '@/data/Colors'
import Lookup from '@/data/Lookup'
import useGetUser from '@/hooks/useGetUser'
import useGetUserWorkspaces from '@/hooks/useGetUserWorkspaces'
import React from 'react'
import { useSelector } from 'react-redux'

const formatNumber = (num) => {
    if (num >= 1000000) {
        return Math.floor(num / 1000000) + 'M ';
    }
    if (num >= 1000) {
        return Math.floor(num / 1000) + 'K ';
    }
    return num.toString();
}

const Pricing = () => {
    const {user} = useSelector(store=>store.user)
    useGetUser()
    useGetUserWorkspaces()
    return (
        <div className='min-h-screen max-h-full p-10 md:px-32 lg:px-48 w-full flex flex-col items-center'>
            <h2 className='font-bold pt-10 text-5xl'>Pricing</h2>
            <p className='text-gray-400 max-w-xl text-center mt-4'>{Lookup.PRICING_DESC}</p>

            <div className='w-full p-4 border rounded-xl flex justify-between items-center mt-6' 
            style={{backgroundColor: Colors.BACKGRAOUND}}>
                <h2 className='text-lg'>
                    <span className='font-bold'>{formatNumber(user?.tokens || 0)}</span> 
                    Tokens Left
                </h2>
                <div>
                    <h2 className='font-medium'>Need more tokens?</h2>
                    <p>Upgrad your plan below.</p>
                </div>
            </div>
            <PricingModel/>
        </div>
    )
}

export default Pricing