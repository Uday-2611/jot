import React, { useState } from 'react'
import { Heart, Trash2, Share2, Tag, FileText, Hash, Copy, Check } from 'lucide-react'

const ActionCard = ({ isOpen }) => {
    const [isFavorited, setIsFavorited] = useState(false)
    const [copied, setCopied] = useState(false)
    const [tags, setTags] = useState('')

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText('3445454')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleFavorite = () => {
        setIsFavorited(!isFavorited)
    }

    return (
        <div className="absolute top-10 left-0 w-80 bg-card/95 backdrop-blur-sm rounded-xl z-50 p-3 flex flex-col gap-2 border border-border/20 shadow-xl">
            {/* Leaf Name */}
            <div className='px-4 py-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer'> 
                <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-muted-foreground'>Leaf Name</span>
                    <span className='text-sm font-semibold text-foreground'>Name of the Note</span>
                </div>
            </div>

            {/* Leaf ID with Copy */}
            <div className='px-4 py-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer'> 
                <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-muted-foreground'>Leaf ID</span>
                    <div className='flex items-center gap-2'>
                        <span className='text-sm font-mono text-foreground'>3445454</span>
                        <button 
                            onClick={handleCopy}
                            className='p-1 rounded hover:bg-muted/60 transition-colors'
                            title='Copy ID'
                        >
                            {copied ? <Check className='size-3 text-green-500' /> : <Copy className='size-3' />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Add to Favorites */}
            <button 
                onClick={handleFavorite}
                className='px-4 py-3 w-full rounded-lg flex items-center justify-between hover:bg-muted/50 transition-colors text-left'
            > 
                <span className='text-sm font-medium text-muted-foreground'>Add to Favorites</span>
                <Heart 
                    className={`size-4 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-500'}`} 
                />
            </button>

            {/* Tags Input */}
            <div className='px-4 py-3 rounded-lg bg-muted/30'> 
                <div className='flex items-center justify-between mb-2'>
                    <span className='text-sm font-medium text-muted-foreground'>Tags</span>
                    <Tag className='size-4 text-muted-foreground' />
                </div>
                <input 
                    type="text" 
                    placeholder="Add tags..."
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className='w-full px-3 py-2 text-sm bg-background/50 rounded-md border border-border/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-colors'
                />
            </div>

            {/* Share Note */}
            <button className='px-4 py-3 w-full rounded-lg flex items-center justify-between hover:bg-muted/50 transition-colors text-left'> 
                <span className='text-sm font-medium text-muted-foreground'>Share Note</span>
                <Share2 className='size-4 text-muted-foreground hover:text-primary transition-colors' />
            </button>

            {/* Delete */}
            <button className='px-4 py-3 w-full rounded-lg flex items-center justify-between hover:bg-destructive/20 hover:text-destructive transition-colors text-left'> 
                <span className='text-sm font-medium'>Delete</span>
                <Trash2 className='size-4 hover:text-destructive transition-colors' />
            </button>
        </div>
    )
}

export default ActionCard