import React from 'react'
import authImage from '@/public/images/auth.jpg'

const page = () => {
  return (
    <div className='bg-background w-screen h-screen text-background flex'>
      <div className='h-full w-[45%] flex justify-center items-center relative overflow-hidden'>
        <div className='absolute bg-cover bg-center bg-no-repeat size-[95%] rounded-lg' style={{ backgroundImage: `url(${authImage.src})` }} >
        </div>
      </div>
      <div className='h-full w-[55%] text-foreground flex justify-center items-center'>
        <div className='w-[45%] max-w-md text-center flex flex-col gap-1'>
          <h1 className='text-4xl font-semibold'>Zenith Works</h1>
          <p className='text-neutral-400'>Welcome back</p>
          <p className='text-neutral-400'>Enter your details below to start</p>
          <form action="" className='space-y-3 mt-10'>
            <input
              type="email"
              id="email"
              name="email"
              required
              className='w-full p-3 rounded-lg bg-input'
              placeholder="your@email.com"
            />
            <input
              type="password"
              id="password"
              name="password"
              required
              className='w-full p-3 rounded-lg bg-input'
              placeholder="Password"
            />
            <button
              type="submit"
              className='w-full bg-accent text-white p-3 rounded-lg font-medium hover:bg-primary transition-colors'
            >
              Login
            </button>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-neutral-300'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-background text-neutral-500'>Or continue with</span>
              </div>
            </div>
            <button
              type="button"
              className='w-full bg-input text-secondary-foreground p-3 rounded-lg hover:bg-card transition-colors'
            >
              Sign up with Apple
            </button>
          </form>
          <p className='text-neutral-400 mt-4 text-sm' >
            new here? {' '}
            <a href="/auth/signup" className=''>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
