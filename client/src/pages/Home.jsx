import React from 'react'
import Sidebar from '../Components/Sidebar'
import Quiz from '../Components/Quiz'

const Home = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-2 h-screen">
        <Quiz />
      </div>
    </div>
  )
}

export default Home
