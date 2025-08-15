import React from 'react'
import Sidebar from '../Components/Sidebar'
import Quiz from '../Components/Quiz'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-2 h-screen">
        <Outlet />
      </div>
    </div>
  )
}

export default Home
