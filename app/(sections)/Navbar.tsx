// src/app/components/Navbar.tsx

'use client'

import { useEffect, useState } from 'react'
import ShuffleText from '@/app/components/ShuffleText'

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false);

  // Listen for scroll events to toggle the isScrolled state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define heights in pixels (h-16 ~ 64px, h-14 ~ 56px)
  const navbarHeight = isScrolled ? 56 : 64;

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`fixed top-4 z-50 transition-all duration-300 flex items-center justify-center
      ${
        isScrolled
          ? "w-[60%] m-7 h-14 left-1/2 transform -translate-x-1/2 text-[#783128] bg-transparent bg-clip-padding backdrop-filter backdrop-blur-md"
          : "w-[70%] h-16 left-1/2 transform -translate-x-1/2 bg-transparent bg-opacity-90"
      }
      rounded-xl shadow-md`}>
      <ul className='flex gap-[3rem] text-2xl'>
        {['home', 'about', 'projects', 'contact'].map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              className={activeSection === section ? 'active' : ''}
            >
              <ShuffleText text={section.charAt(0).toUpperCase() + section.slice(1)} className={activeSection === section ? 'underline transition-all' : ''}/>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
