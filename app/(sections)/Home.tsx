"use client"
import ShuffleText2 from '../components/ShuffleText2'
import TitleCycler from '../components/TitleCycler'
import ScrollingText from '../components/ScrollingText'
import VerticalScrollingText from '../components/VerticalScrollingText'
import Link from 'next/link'

const Home = () => {
  const titles = [
    "MERN Developer",
    "UI/UX Designer",
    "Otaku",
    "AI Enthusiast"
  ]
  
  return (
    <div id='home' className='relative min-h-screen overflow-hidden bg-[#dbdee3] pb-10'>
      <div className="absolute top-0 right-0 h-full pointer-events-none hidden sm:block">
        <VerticalScrollingText
          text="PROJECTS SKILLS EXPERIENCE "
          direction="up"
          fontSize="6rem"
          color="#00000010"
          speed={1}
          containerHeight="100vh"
        />
      </div>
      
      {/* Main content */}
      <div className='relative z-10 flex flex-col justify-center h-screen px-4 sm:px-8 md:px-12 lg:px-24'>
        <div className="max-w-3xl">
          <ShuffleText2 text="Sai Aryan" className='text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold'/>
          <br />
          <ShuffleText2 text="Goswami" className='text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4'/>
          <div className="h-16 mt-3">
            <TitleCycler titles={titles} />
          </div>
          <p className="mt-6 text-base sm:text-xl md:text-2xl text-gray-600 max-w-lg">
            Creating elegant, interactive web experiences with modern technology and creative design principles.
          </p>
          <div className="mt-4 sm:mt-6 md:mt-8 flex flex-wrap gap-3">
            <button className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-black text-white rounded-full hover:bg-gray-800 transition cursor-pointer text-sm sm:text-base">
              <Link href="#projects">View My Work</Link>
            </button>
            <button className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 border-2 border-black rounded-full hover:bg-gray-100 transition cursor-pointer text-sm sm:text-base">
              <Link href="#contact">Contact</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0">
         <div className="overflow-hidden">
          <ScrollingText
          text="BADMINTON CHESS FOOTBALL"
          direction="right"
          fontSize="clamp(1.5rem, 5vw, 3rem)"
          color="#0000003d"
          speed={1}
        />
        </div>
      </div>
    </div>
  )
}

export default Home