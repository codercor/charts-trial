
import { useCallback } from 'react'
import { motion } from 'framer-motion'

import { ItemType } from './type'
const ItemChart = function ItemChart({ value }: ItemType) {
    //get color from value
    const getRGB = useCallback((value: number) => {
        const red = Math.round((value / 10) * 240) - 150
        const green = Math.round((value / 10) * 250) - 50
        const blue = Math.round((value / 10) * 200) - 90
        return `rgb(${red},${green},${blue})`
    }, [])

    return <motion.div
        className="min-w-[3rem] hover:opacity-80 self-end text-white text-center flex flex-col justify-between items-center flex-grow-0 flex-shrink-0"
        initial={{ height: 0 }}
        animate={{
            // this is the height of the bar in percentage
            height: `${((value) / 10) * 96}%`,
        }}
        transition={{ duration: 1, ease: "easeIn" }}
        style={{ backgroundColor: getRGB(value), }}
    >
        <span className='font-black'> {value}</span>
    </motion.div>
}

export default ItemChart;