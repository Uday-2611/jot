'use client'
import { MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import f1Image from '@/public/images/f1.jpg'
import f2Image from '@/public/images/f2.jpg'
import f3Image from '@/public/images/f3.jpg'
import f4Image from '@/public/images/f4.jpg'
import f6Image from '@/public/images/f6.jpg'

const page = () => {
  const rootRef = useRef(null)
  const heroImagesRef = useRef(null)

  const headline =
    'A seamless canvas for every thought.\nWhere your ideas find form and\norganization is effortless.'
  const brand = 'Zenith Works'
  const ctaText = 'Get started'

  useEffect(() => {
    if (heroImagesRef.current) {
      // Get the total width of all images to calculate the loop distance
      const container = heroImagesRef.current
      const totalWidth = container.scrollWidth
      const visibleWidth = container.clientWidth
      
      // Calculate how far to move to create seamless loop
      // We move by the width of the first set of images
      const loopDistance = totalWidth / 2

      // Create GSAP timeline for infinite horizontal carousel
      const tl = gsap.timeline({
        repeat: -1, // Infinite repetition
        ease: "none" // Linear movement for consistent speed
      })

      // Move the container to the left by the loop distance
      tl.to(heroImagesRef.current, {
        x: -loopDistance,
        duration: 30, // 30 seconds for smooth movement
        ease: "none" // Linear easing for consistent movement speed
      })

      // Cleanup function to kill timeline on unmount
      return () => {
        tl.kill()
      }
    }
  }, [])

  return (
    <div ref={rootRef} className='w-screen h-screen flex flex-col justify-between'>
      <div className='w-full flex justify-between p-6 items-center font-mono'>
        <h1 className='font-semibold text-3xl leading-tight'>
          {brand.split('').map((ch, idx) => (
            <span key={idx} className='brand-letter inline-block'>
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h1>
        <Link
          href='/auth/login'
          className='cta-btn bg-foreground rounded-md h-11 px-5 flex items-center gap-2 text-background hover:bg-foreground/90 transition-colors'
        >
          <MoveUpRight className='text-background' />
          <span aria-label={ctaText}>
            {ctaText.split('').map((ch, idx) => (
              <span key={idx} className='cta-letter inline-block'>
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </span>
        </Link>
      </div>

      <div className='flex-col h-[70%] p-6 gap-6 flex'>
        <h3 className='font-medium text-5xl md:text-6xl leading-tight md:leading-[1.15] whitespace-pre-wrap'>
          {headline.split('').map((ch, idx) =>
            ch === '\\n' ? (
              <br key={`br-${idx}`} />
            ) : (
              <span key={idx} className='headline-letter inline-block'>
                {ch}
              </span>
            )
          )}
        </h3>

        <div className='overflow-hidden w-full h-full'>
          <div ref={heroImagesRef} className='hero-images-container flex gap-1 h-full' style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}>
            {/* First set of images */}
            <div className='hero-img w-[20%] h-full rounded-md bg-cover bg-center bg-no-repeat flex-shrink-0' style={{ backgroundImage: `url(${f1Image.src})` }}></div>
            <div className='hero-img w-[20%] h-full rounded-md bg-cover bg-center bg-no-repeat flex-shrink-0' style={{ backgroundImage: `url(${f2Image.src})` }}></div>
            <div className='hero-img w-[15%] h-full rounded-md bg-cover bg-center bg-no-repeat flex-shrink-0' style={{ backgroundImage: `url(${f3Image.src})` }}></div>
            <div className='hero-img w-[25%] h-full rounded-md bg-cover bg-center bg-no-repeat flex-shrink-0' style={{ backgroundImage: `url(${f4Image.src})` }}></div>
            <div className='hero-img w-[25%] h-full rounded-md bg-cover bg-center bg-no-repeat flex-shrink-0' style={{ backgroundImage: `url(${f6Image.src})` }}></div>
            
            {/* Duplicate set for seamless loop */}
            <div className='hero-img w-[20%] h-full rounded-md bg-cover bg-center bg-no-repeat flex-shrink-0' style={{ backgroundImage: `url(${f1Image.src})` }}></div>
            <div className='hero-img w-[20%] h-full rounded-md bg-cover bg-center bg-no-repeat flex-shrink-0' style={{ backgroundImage: `url(${f2Image.src})` }}></div>
            <div className='hero-img w-[15%] h-full rounded-md bg-cover bg-center bg-no-repeat flex-shrink-0' style={{ backgroundImage: `url(${f3Image.src})` }}></div>
            <div className='hero-img w-[25%] h-full rounded-md bg-cover bg-center bg-no-repeat flex-shrink-0' style={{ backgroundImage: `url(${f4Image.src})` }}></div>
            <div className='hero-img w-[25%] h-full rounded-md bg-cover bg-center bg-no-repeat flex-shrink-0' style={{ backgroundImage: `url(${f6Image.src})` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
