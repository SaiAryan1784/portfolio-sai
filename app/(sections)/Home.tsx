import React from 'react'
import ShuffleText2 from '../components/ShuffleText2'

const Home = () => {
  return (
    <div id='home' className='min-h-screen mt-[9rem] flex flex-col justify-left ml-10'>
        <ShuffleText2 text="Sai Aryan" className='text-[6rem] font-bold'/>
        <ShuffleText2 text="Goswami" className='text-[6rem] font-bold'/>
    </div>
  )
}

export default Home