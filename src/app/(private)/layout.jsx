import Navbar from '@/components/Navbar'
import React, { Children } from 'react'

const layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default layout
