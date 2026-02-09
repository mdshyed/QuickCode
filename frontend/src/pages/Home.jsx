import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useGetUser from '../hooks/useGetUser'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Custom/Header'
import Hero from '@/components/Custom/Hero'
import useGetUserWorkspaces from '@/hooks/useGetUserWorkspaces'

const Home = () => {
    const {user} = useSelector(store => store.user)
    const navigate = useNavigate();
    useGetUser()
    useGetUserWorkspaces()

    return (
        <div className='w-full h-screen'>
            <Header/>
            <Hero/>
        </div>
    )
}

export default Home