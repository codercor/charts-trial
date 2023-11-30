import { clsx } from 'clsx'
import React from 'react'
import { motion } from 'framer-motion'


type ControlButtonProps = {
    children: React.ReactNode,
    onClick: () => void,
    disabled: boolean,
    bgClass: string,
    icon: React.ReactNode
}

const ControlButton = ({ children, onClick, disabled, bgClass, icon }: ControlButtonProps) => {
    return (
        <motion.button
            onClick={onClick}
            className={clsx("controls", {
                "disabled": disabled,
                [bgClass]: true
            })}
        >
            {icon}
            <span className='hidden md:block'> {children}</span>
        </motion.button>
    )
}

export default ControlButton