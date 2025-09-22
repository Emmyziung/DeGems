import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Socials from './components/ui/socials'
import { IconGitBranch } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import Header from './components/ui/header'
import Hero from './components/ui/hero'
import Executives from './components/ui/executives'
import About from './components/ui/about'
import Activities from './components/ui/activities'
import Member from './components/ui/member'
function App() {
 return <div className='bg-gray-50 '>
    <Header/>
    <Hero/>
     <Executives/>
    {/* <About/> */}
   <Activities/>
   <Member/>
   {/* <Socials/> */}
 </div> 
}

export default App
