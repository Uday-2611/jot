'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

export default function NotePage({ params }) {
  const { noteId } = React.use(params)
  
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Note {noteId}</h1>
        </div>
        <input
          type="text"
          placeholder="Note title"
          className="w-full bg-input/40 backdrop-blur-sm px-4 py-3 rounded-xl text-lg focus:outline-none focus:ring-0"
        />
        <Editor />
      </div>
    </div>
  )
}
