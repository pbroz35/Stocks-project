import React from 'react'
import Card from './Card'

const Header = () => {
    return (
        <Card>

        <div className='flex justify-between items-center h-1'>

        <h1 className="  ">Stock-Name</h1>
        
        <button className='border-2'>Dark-Mode</button>
        
        </div>
        </Card>
    )
}

export default Header
