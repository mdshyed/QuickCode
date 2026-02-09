import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../Auth/LoginDialog'
import Home from '../../pages/Home'
import Workspace from '../../pages/Workspace'
import Pricing from '@/pages/Pricing'
const Body = () => {
    const router  = createBrowserRouter([
        {
            path:'/',
            element: <Home/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/workspace/:id',
            element: <Workspace/>
        },
        {
            path: '/pricing',
            element: <Pricing/>
        }
    ])
    return (
        <RouterProvider router={router}>

        </RouterProvider>
    )
}

export default Body