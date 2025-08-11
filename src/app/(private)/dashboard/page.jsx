'use client'
import Card from '@/components/Card'
import { Plus } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()

  const handleNewNote = () => {
    const newNoteId = Date.now().toString()
    router.push(`/notes/${newNoteId}`)
  }

  return (
    <div className='flex min-h-screen relative'>
      

      <div className='w-96 mt-28 ml-4 flex flex-col h-[calc(100vh-7rem)] gap-3'>
        <div className='space-y-3 z-10 bg-background/80 backdrop-blur-sm rounded-xl'>
          <input type="text" className='bg-input/40 backdrop-blur-sm px-6 py-3 w-full rounded-xl text-lg font-medium text-foreground shadow-lg focus:outline-none focus:ring-0' placeholder='Search...' />
          <button onClick={handleNewNote} className='bg-accent/80 backdrop-blur-sm px-6 py-3 w-full rounded-xl text-lg font-medium text-primary-text flex gap-2 items-center shadow-lg'> <Plus className='size-5' /> New Note</button>
        </div>

        <div className='flex-1 hide-scrollbar space-y-3 rounded-xl mb-8 z-10'>
          <Card />
        </div>
      </div>
    </div>
  )
}

export default page