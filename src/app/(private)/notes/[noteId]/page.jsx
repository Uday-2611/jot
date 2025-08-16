'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

export default function NotePage({ params }) {
  const { noteId } = React.use(params)

  return (
    <div className="min-h-screen p-10">
      <div className="w-full mx-auto space-y-6">
        <input type="text" placeholder="Note title..." className="w-full py-3 rounded-xl text-5xl focus:outline-none focus:ring-0 mt-20 text-white" />
        <Editor />
      </div>
    </div>
  )
}
