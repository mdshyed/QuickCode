import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Body from './components/Routes/Body'
import { Toaster } from "@/components/ui/sonner"


function App() {

  return (
    <>
      <Body/>
      <Toaster />
    </>
  )
}

export default App
