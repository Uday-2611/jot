import React from 'react'
import { LogOut, Upload, Pen, Lock } from 'lucide-react'

const ProfileCard = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute top-16 right-4 w-80 bg-card/60 rounded-xl z-50 p-1 flex flex-col gap-1">
            <button className='px-6 py-3 w-full rounded-xl flex gap-2 items-center justify-between hover:bg-muted/80'> Avatar <Upload className='size-4' /></button>
            <button className='px-6 py-3 w-full rounded-xl flex gap-2 items-center justify-between hover:bg-muted/80'> Name <Pen className='size-4' /></button>
            <div className='px-6 py-3 w-full rounded-xl flex gap-2 items-center justify-between'>
                <p>E-mail</p>
                <p className='text-sm text-primary-text hover:text-pr'>udayagarwal234@gmail.com</p>
            </div>
            <button className='px-6 py-3 w-full rounded-xl flex gap-2 items-center justify-between hover:bg-muted/80'> Password <Lock className='size-4' /></button>
            <button className='px-6 py-3 w-full rounded-xl flex gap-2 items-center justify-between hover:bg-destructive/20 hover:text-destructive'> Logout <LogOut className='size-4' /></button>

        </div>
    )
}

export default ProfileCard
