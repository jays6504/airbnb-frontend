import './app.scss'
import React from 'react'
import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import { AppHeader } from './cmps/app-header'
import { Home } from './pages/Home/home'
import { StayDetails } from './pages/StayDetails/stay-details'

function App() {
    return (
        <div className='app'>
            <AppHeader />
            <main className='main-content main-layout'>
                <Routes>
                    <Route path='/airbnb-frontend/' element={<Home />} />
                    <Route path='/stay/:id' element={<StayDetails />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
