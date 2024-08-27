import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import { About } from './components/about'
import { Users } from './components/Users'
import { Navbar } from './components/Navbar'



export const App = () => {
  return (
    <>
        <Navbar />
        <div className='conatainer p-5'>
            <Routes>
                <Route path='/about' element={ <About /> } />
                <Route path='/' element={ <Users /> } />
            </Routes>
        </div>
    </>
  )
}
