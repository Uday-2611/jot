import React from 'react'
import { LogOut, Upload, Pen, Lock } from 'lucide-react'

const ActionCard = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute top-16 right-0 w-80 bg-card/95 backdrop-blur-sm rounded-xl z-50 p-1 flex flex-col gap-1 border border-border shadow-lg">
            <button className='px-6 py-3 w-full rounded-xl flex gap-2 items-center justify-between hover:bg-muted/80 transition-colors'> Avatar <Upload className='size-4' /></button>
            <button className='px-6 py-3 w-full rounded-xl flex gap-2 items-center justify-between hover:bg-muted/80 transition-colors'> Name <Pen className='size-4' /></button>
            <div className='px-6 py-3 w-full rounded-xl flex gap-2 items-center justify-between'>
                <p>E-mail</p>
                <p className='text-sm text-primary-text hover:text-primary'>udayagarwal234@gmail.com</p>
            </div>
            <button className='px-6 py-3 w-full rounded-xl flex gap-2 items-center justify-between hover:bg-muted/80 transition-colors'> Password <Lock className='size-4' /></button>
            <button className='px-6 py-3 w-full rounded-xl flex gap-2 items-center justify-between hover:bg-destructive/20 hover:text-destructive transition-colors'> Logout <LogOut className='size-4' /></button>
        </div>
    )
}

export default ActionCard


// leaf name
// leaf id
// add to favorites
// delete 
// share note
// tags