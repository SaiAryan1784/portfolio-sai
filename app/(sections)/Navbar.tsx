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
    // Close menu when clicking outside on mobile
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && e.target instanceof Element) {
        const navElement = document.querySelector('nav');
        const hamburgerButton = document.querySelector('button[aria-label="Toggle menu"]');
        if (navElement && hamburgerButton && !navElement.contains(e.target) && !hamburgerButton.contains(e.target)) {
          setIsMenuOpen(false);
        }
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Desktop navbar - vertical on right */}
      <nav className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300 hidden sm:flex
        ${
          isScrolled
            ? "bg-gray-800/90 text-white"
            : "bg-gray-900/90 text-white"
        }
        rounded-xl shadow-xl border border-gray-500/50 px-4 py-5 backdrop-blur-md`}>
        <ul className='flex flex-col gap-5 text-base md:text-lg text-white w-full'>
          {['home', 'about', 'projects', 'contact'].map((section) => (
            <li key={section} className="px-3 py-2 hover:bg-blue-500/30 rounded-lg transition-colors text-center">
              <a
                href={`#${section}`}
                className={activeSection === section ? 'active' : ''}
              >
                <ShuffleText text={section.charAt(0).toUpperCase() + section.slice(1)} className={activeSection === section ? 'text-blue-300 font-bold transition-all' : ''}/>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Mobile hamburger button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 right-4 z-50 w-8 h-8 flex items-center justify-center bg-gray-800/80 text-white rounded-lg shadow-lg border border-gray-500/50 sm:hidden"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
      </button>
      
      {/* Mobile overlay when menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* Mobile navbar - slides in from right */}
      <div 
        className={`
          fixed z-40 transition-all duration-300 
          bg-gray-800/90 text-white backdrop-blur-sm
          rounded-lg shadow-lg border border-gray-500/30
          sm:hidden
          ${isMenuOpen ? 'right-4 top-14 w-[180px] p-2' : 'right-[-100%] top-14 w-[180px] p-2'}
        `}
      >
        <div className="max-h-[70vh] overflow-y-auto py-1">
          <ul className='flex flex-col gap-3 text-sm'>
            {['home', 'about', 'projects', 'contact'].map((section) => (
              <li key={section} className="px-3 py-2 hover:bg-blue-500/30 rounded-lg transition-colors">
                <a
                  href={`#${section}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={activeSection === section ? 'active' : ''}
                >
                  <ShuffleText 
                    text={section.charAt(0).toUpperCase() + section.slice(1)} 
                    className={activeSection === section ? 'text-blue-300 font-bold transition-all' : ''}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
