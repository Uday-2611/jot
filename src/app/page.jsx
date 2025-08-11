'use client'
import { MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import f1Image from '@/public/images/f1.jpg'
import f2Image from '@/public/images/f2.jpg'
import f3Image from '@/public/images/f3.jpg'
import f4Image from '@/public/images/f4.jpg'
import f5Image from '@/public/images/f5.jpg'
import f6Image from '@/public/images/f6.jpg'

const page = () => {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Images enter staggered from left
      gsap.from('.hero-img', {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
      })
      // Headline letters rise in
      gsap.from('.headline-letter', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.02,
        delay: 0.1,
      })
      // Brand letters rise in
      gsap.from('.brand-letter', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.03,
      })
      // CTA letters rise in and the button slides slightly
      gsap.from('.cta-letter', {
        y: 14,
        opacity: 0,
        duration: 0.45,
        ease: 'power3.out',
        stagger: 0.02,
        delay: 0.15,
      })
      gsap.from('.cta-btn', {
        y: 8,
        opacity: 0,
        duration: 0.45,
        ease: 'power3.out',
        delay: 0.2,
      })
      // Hover raise effect per image using GSAP
      const imgs = gsap.utils.toArray('.hero-img')
      imgs.forEach((el) => {
        const onEnter = () => gsap.to(el, { y: -10, duration: 0.25, ease: 'power3.out' })
        const onLeave = () => gsap.to(el, { y: 0, duration: 0.3, ease: 'power3.out' })
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
        // store listeners for cleanup
        ;(el)._gsapEnter = onEnter
        ;(el)._gsapLeave = onLeave
      })
    }, rootRef)
    return () => {
      // cleanup listeners
      const imgs = document.querySelectorAll('.hero-img')
      imgs.forEach((el) => {
        if ((el)._gsapEnter) el.removeEventListener('mouseenter', (el)._gsapEnter)
        if ((el)._gsapLeave) el.removeEventListener('mouseleave', (el)._gsapLeave)
      })
      ctx.revert()
    }
  }, [])

  const headline =
    'A seamless canvas for every thought.\nWhere your ideas find form and\norganization is effortless.'
  const brand = 'Zenith Works'
  const ctaText = 'Get started'

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

        <div className='w-full flex gap-1 h-full'>
          <div
            className='hero-img w-[15%] h-full rounded-md bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${f1Image.src})` }}
          ></div>
          <div
            className='hero-img w-[15%] h-full rounded-md bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${f2Image.src})` }}
          ></div>
          <div
            className='hero-img w-[15%] h-full rounded-md bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${f3Image.src})` }}
          ></div>
          <div
            className='hero-img w-[15%] h-full rounded-md bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${f4Image.src})` }}
          ></div>
          <div
            className='hero-img w-[15%] h-full rounded-md bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${f5Image.src})` }}
          ></div>
          <div
            className='hero-img w-[25%] h-full rounded-md bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${f6Image.src})` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default page
