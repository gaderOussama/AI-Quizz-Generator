import React from 'react'

const Sidebar = () => {

    const elements=["Home", "About", "Contact"];
  return (
    <div className='w-1/5 h-full bg-dark text-white justify-center items-center'>
        <div className='flex flex-col  h-full p-4'>
            <div className='flex text-center mb-8 h-1/8 border-b border-b-gray-500 items-center justify-center'>
                <h1 className='text-2xl font-bold text-center'> 
                    AI Quizz
                </h1>
            </div>
            <div className='flex flex-col h-5/6 items-center'>
                <ul className='flex flex-col gap-2 w-full h-full'>
                    {elements.map((element, index) => (
                        <li key={index} className='text-lg cursor-pointer hover:bg-gray-950 text-center p-5 w-full rounded-lg transition-colors  duration-200 '>
                            {element}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Sidebar