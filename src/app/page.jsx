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
import logoImage from '@/public/images/logo_image.png'

const page = () => {
  const heroImagesRef = useRef(null)
  const headlineRef = useRef(null)

  const headline =
    'A seamless canvas for every thought. Where your ideas find form and organization is effortless.'
  const ctaText = 'Get started'

  useEffect(() => {
    // Headline animation on load
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.headline-word')
      
      // Set initial position (above their final position)
      gsap.set(words, { y: -50, opacity: 0 })
      
      // Animate words to their final position with stagger
      gsap.to(words, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      })
    }

    // Carousel animation
    if (heroImagesRef.current) {
      // Get the total width of all images to calculate the loop distance
      const container = heroImagesRef.current
      const totalWidth = container.scrollWidth

      // Calculate how far to move to create seamless loop
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
    <div className='w-screen h-screen flex flex-col justify-between'>
      {/* Header Section */}
      <div className='w-full flex justify-between items-center px-8 py-6'>
        <img
          src={logoImage.src}
          alt="Zenith Books Logo"
          className="h-16 w-auto"
        />

        <Link
          href='/auth/login'
          className='cta-btn bg-foreground rounded-md h-11 px-6 flex items-center gap-2 text-background hover:bg-foreground/90 transition-colors'
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

      {/* Main Content Section */}
      <div className='flex flex-col h-[70%] px-8 pb-8 gap-8'>
        <h3 ref={headlineRef} className='font-medium text-5xl md:text-6xl leading-tight md:leading-[1.15]'>
          {headline.split(' ').map((word, idx) => (
            <span key={idx} className='headline-word inline-block mr-4'>
              {word}
            </span>
          ))}
        </h3>

        {/* Image Carousel Container */}
        <div className='overflow-hidden w-full h-full rounded-md'>
          <div
            ref={heroImagesRef}
            className='hero-images-container flex gap-2 h-full'
            style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
          >
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
