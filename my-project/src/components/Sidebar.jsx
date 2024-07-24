import React from 'react'
import Card from './Card'
import Search from './Search'
import StockContainer from './StockContainer'
import { useContext } from 'react'

const Scrollbar = () => {
    return (
        <Card>

        <Search></Search>

        <StockContainer></StockContainer>


        </Card>
    )
}

export default Scrollbar
