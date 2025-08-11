'use client'

import { Sparkle } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import ProfileCard from './ProfileCard'

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className='fixed w-full h-20 flex justify-between items-center p-4 bg-transparent'>
        <div className='flex gap-12 items-center'>
            <h1 className='font-mono font-medium text-2xl'>Zenith Works</h1>
            <button className='bg-accent px-6 py-2 rounded-xl text-lg font-medium text-primary-text flex gap-2 items-center'> <Sparkle className='size-5' /> Ask AI</button>
        </div>

        <div className='relative' ref={profileRef}>
            <button 
                onClick={toggleProfile}
                className='bg-primary rounded-full size-10 hover:scale-105 transition-transform cursor-pointer flex items-center justify-center'
            >
                <span className='text-primary-foreground font-semibold text-lg'></span>
            </button>
            
            <ProfileCard isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </div>
    </div>
  )
}

export default Navbar
