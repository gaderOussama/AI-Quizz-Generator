import React from 'react'
import Quizzer from "../assets/Quizzer.png"
import { Link } from 'react-router-dom'
const Sidebar = () => {

    const elements=[{name:"Home", link:"/"}, {name:"About", link:"about"}];
  return (
    <div className='w-1/5 h-full bg-dark text-white justify-center items-center'>
        <div className='flex flex-col  h-full p-4'>
            <div className='flex text-center mb-8 h-1/8 items-center justify-center p-8 mt-5'>
                <div className='flex items-center justify-center p-5 h-fit'>
                                        <img 
                                            src={Quizzer} 
                                            alt="Quizzer Logo" 
                                            className='max-w-[120px] w-full h-auto object-contain inline-block mr-2' 
                                            style={{ minWidth: '60px', minHeight: '60px' }}
                                        />
                </div>
            </div>
            <div className='flex flex-col h-5/6 items-center border-t-1 border-t-purple-400 p-5'>
                <ul className='flex flex-col gap-2 w-full h-full'>
                    {elements.map((element, index) => (
                        <li key={index} className='text-lg cursor-pointer hover:bg-gray-950 text-center p-5 w-full rounded-lg transition-colors  duration-200 '>
                            <Link to={element.link} className='w-full h-full flex items-center justify-center'>
                                {element.name}
                            </Link>
                            
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Sidebar