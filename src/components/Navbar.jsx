'use client'

import { Ellipsis } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import ProfileCard from './ProfileCard'
import ActionCard from './ActionCard'

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const profileRef = useRef(null);
  const actionRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (actionRef.current && !actionRef.current.contains(event.target)) {
        setIsActionOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleAction = () => {
    setIsActionOpen(!isActionOpen);
  };

  return (
    <div className='fixed w-full h-20 flex justify-between items-center p-4 bg-transparent z-100'>
      <div className='flex gap-12 items-end'>
        <h1 className='font-mono font-medium text-2xl'>Zenith Works</h1>
        <div className='relative' ref={actionRef}>
          <button onClick={toggleAction} className='hover:bg-accent px-2 py-1 rounded-lg'> <Ellipsis className='size-5' /> </button>
          <ActionCard isOpen={isActionOpen} onClose={() => setIsActionOpen(false)} />
        </div>
      </div>

      <div className='relative' ref={profileRef}>
        <button onClick={toggleProfile} className='bg-primary hover:bg-primary/90 rounded-full size-10 hover:scale-105 transition-all cursor-pointer flex items-center justify-center border-2 border-primary-foreground/20'>
          <span className='text-primary-foreground font-semibold text-lg'>U</span>
        </button>

        <ProfileCard isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      </div>
    </div>
  )
}

export default Navbar
