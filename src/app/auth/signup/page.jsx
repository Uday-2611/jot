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
          <p className='text-neutral-400'>Welcome</p>
          <p className='text-neutral-400'>Enter your details below to start</p>
          <form action="" className='space-y-3 mt-10'>
            <input
              type="name"
              id="name"
              name="name"
              required
              className='bg-input/40 backdrop-blur-sm px-6 py-3 w-full rounded-xl text-lg font-medium text-foreground shadow-lg focus:outline-none focus:ring-0'
              placeholder="full name"
            />
            <input
              type="email"
              id="email"
              name="email"
              required
              className='bg-input/40 backdrop-blur-sm px-6 py-3 w-full rounded-xl text-lg font-medium text-foreground shadow-lg focus:outline-none focus:ring-0'
              placeholder="your@email.com"
            />
            <input
              type="password"
              id="password"
              name="password"
              required
              className='bg-input/40 backdrop-blur-sm px-6 py-3 w-full rounded-xl text-lg font-medium text-foreground shadow-lg focus:outline-none focus:ring-0'
              placeholder="Password"
            />
            <button
              type="submit"
              className='bg-accent/80 backdrop-blur-sm px-6 py-3 w-full rounded-xl text-lg font-medium text-primary-text flex gap-2 items-center justify-center shadow-lg'
            >
              Create account
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
              className='bg-input/40 backdrop-blur-sm px-6 py-3 w-full rounded-xl text-lg font-medium flex justify-center gap-2 items-center shadow-lg'
            >
              Sign up with Apple
            </button>
          </form>
          <p className='text-neutral-400 mt-4 text-sm' >
            have an account? {' '}
            <a href="/auth/login" className=''>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
