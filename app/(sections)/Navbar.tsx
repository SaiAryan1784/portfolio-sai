// src/app/components/Navbar.tsx

'use client'

import { useEffect, useState } from 'react'
import ShuffleText from '@/app/components/ShuffleText'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Listen for scroll events to toggle the isScrolled state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <>
      {/* Mobile hamburger button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-gray-800/80 text-white rounded-lg shadow-lg border border-gray-500/50 sm:hidden"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Navbar - vertical on desktop, hidden behind hamburger on mobile */}
      <nav className={`fixed z-40 transition-all duration-300 
        ${
          isScrolled
            ? "bg-gray-800/80 text-white bg-clip-padding backdrop-filter backdrop-blur-md"
            : "bg-gray-900/80 text-white bg-clip-padding backdrop-filter backdrop-blur-md"
        }
        rounded-xl shadow-xl border border-gray-500/50 
        ${isMenuOpen 
          ? "right-0 top-0 h-auto w-64 p-4 mt-16" 
          : "right-[-100%] top-0 h-auto w-64 p-4 mt-16 sm:right-4 sm:mt-0 sm:top-1/2 sm:transform sm:-translate-y-1/2 sm:p-3 sm:w-auto sm:block"
        }
      `}>
        <ul className='flex flex-col gap-4 sm:gap-6 text-base sm:text-lg md:text-xl text-white'>
          {['home', 'about', 'projects', 'contact'].map((section) => (
            <li key={section} className="px-3 py-2 hover:bg-blue-500/30 rounded-lg transition-colors">
              <a
                href={`#${section}`}
                onClick={() => setIsMenuOpen(false)}
                className={activeSection === section ? 'active' : ''}
              >
                <ShuffleText text={section.charAt(0).toUpperCase() + section.slice(1)} className={activeSection === section ? 'text-blue-300 font-bold transition-all' : ''}/>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
