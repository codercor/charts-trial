import { useRef, useMemo, useEffect } from 'react'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'

import ItemChart from './ItemChart';

import { ItemType } from './type';

export interface ChartProps {
    data: ItemType[];
    title: string;
}

const Chart = ({
    data,
    title
}: ChartProps) => {

    // ref, to get the height of the chart
    const ref = useRef<HTMLDivElement>(null)

    // drag constraints for the user to drag the chart
    const dragConstraints = useMemo(() => {
        if (!ref?.current) return undefined;

        return {
            top: 0,
            bottom: 0,
            left: - (data.length - 4) * 52,
            right: 0,
        }
    }, [data.length, ref?.current?.scrollWidth, ref?.current?.offsetWidth])

    const x = useMotionValue(0)

    useEffect(() => {
        data.length > 5 && x.set(-(data.length - 3) * 52)
        data.length == 0 && x.set(0)
    }, [data.length])

    return (
        <div className="wh-full border-2 flex flex-col">
            <div className="flex justify-between items-center p-2">
                <h2> {title} </h2>
                <p className='text-[0.9rem]'> Item Count : {data.length} </p>
            </div>
            <div className="flex items-end h-full gap-1">
                <div className="h-full flex-col-reverse border-r-2 flex mr-2 justify-between basis-[10%]  shrink-0 items-center">
                    {Array(10).fill(0).map((_, i) => <span className="relative text-center border-b w-full" key={i}>
                        {i + 1}
                        <i className='w-3 h-[1px] top-2 -right-2 absolute bg-black'>  </i>
                    </span>)}
                </div>
                <div ref={ref} className="min-w-[86%] w-fit h-full overflow-hidden">
                    {data.length ?
                        <motion.div drag={data.length > 0 ? "x" : false}
                            dragDirectionLock={data.length > 0 ? true : undefined}
                            animate={{ x: x.get() }}
                            whileDrag={{
                                cursor: 'grabbing',
                                speed: 0.5,
                                opacity: 0.8,
                            }}
                            dragConstraints={dragConstraints} className="flex h-full items-end relative align-bottom max-w-full gap-1 basis-full">
                            <AnimatePresence>
                                {data.map((d) => (
                                    <ItemChart
                                        key={d.id} {...d} />
                                ))}
                            </AnimatePresence>
                        </motion.div> : <div className="flex justify-center items-center h-full w-full"> <p className='text-[0.8rem]'> No data </p> </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Chart;