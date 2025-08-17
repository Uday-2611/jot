'use client'

import { Ellipsis } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import ProfileCard from './ProfileCard'
import ActionCard from './ActionCard'
import logoImage from '@/public/images/logo_image.png'

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const profileRef = useRef(null);
  const actionRef = useRef(null);

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
    <div className='fixed w-full h-20 flex justify-between items-center p-6 bg-transparent z-50'>
      <div className='flex items-center gap-8'>
        <img src={logoImage.src} alt="Zenith Books Logo" className="h-16 w-auto" />
        <div className='relative' ref={actionRef}>
          <button onClick={toggleAction} className='hover:bg-accent/20 px-3 py-2 rounded-lg transition-colors'> 
            <Ellipsis className='size-5' /> 
          </button>
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
