'use client'

import { useEffect, useState } from 'react'
import ShuffleText from '@/app/components/ShuffleText'
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Listen for scroll events to toggle the isScrolled state
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
      {/* Blur Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <nav className="fixed top-0 w-full px-4 py-4 z-40">
        <div className="max-w-7xl mx-auto flex justify-end">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="relative overflow-hidden rounded-full nav-glass shadow-lg border border-white/30" 
              style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            >
              {/* Enhanced blue tint corner accent */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 blur-xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-white/10 blur-xl rounded-full" />
              
              <div className="relative px-8 py-4">
                <ul className='flex gap-12'>
                  {['home', 'about', 'projects', 'contact'].map((item) => (
                    <li key={item}>
                      <a 
                        href={`#${item}`} 
                        className={`
                          relative 
                          text-white
                          hover:text-gray-300 
                          transition-all
                          text-lg
                          font-medium
                          ${activeSection === item ? 'font-bold' : 'text-white/90'}
                        `}
                      >
                        <ShuffleText text={item.charAt(0).toUpperCase() + item.slice(1)} />
                        {activeSection === item && (
                          <motion.div 
                            className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
                            layoutId="underline"
                            style={{ boxShadow: '0 0 8px rgba(255,255,255,0.5)' }}
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Button - Right aligned */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="nav-glass p-3 rounded-full shadow-lg border border-white/30 hamburger-fixed"
              style={{ 
                background: 'rgba(0, 0, 0, 0.7)', 
                maxWidth: '48px', 
                maxHeight: '48px', 
                overflow: 'hidden', 
                position: 'absolute', 
                right: 'calc(5%)', 
                top: '16px', 
                zIndex: '50' 
              }}
              aria-label="Toggle menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="w-6 h-6 text-white"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 w-64 nav-glass rounded-2xl shadow-lg border border-white/30"
              style={{ background: 'rgba(0, 0, 0, 0.85)', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)' }}
            >
              <ul className="py-4">
                <li className="px-6 py-2 text-center text-lg font-bold text-white" style={{ textShadow: '0 0 3px rgba(255,255,255,0.5)' }}>
                  メニュー
                </li>
                <div className="h-0.5 mx-4 my-2 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                {['home', 'about', 'projects', 'contact'].map((item) => (
                  <motion.li 
                    key={item}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', x: 3 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <a 
                      href={`#${item}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-6 py-3 font-medium transition-all duration-300 ${activeSection === item ? 'font-bold' : 'text-white/90 hover:text-white'}`}
                      style={{ textShadow: activeSection === item ? '0 0 3px rgba(255,255,255,0.7)' : 'none' }}
                    >
                      <ShuffleText text={item.charAt(0).toUpperCase() + item.slice(1)} />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}

export default Navbar
