import { useState, useCallback } from 'react'
import { v4 } from 'uuid'
import { AnimatePresence, motion } from 'framer-motion'
import { FaPlay as IconPlay, FaPause as IconPause, FaStop as IconStop, FaRedo as IconReset } from 'react-icons/fa'

import Chart from './Chart/Chart'
import { ItemType } from './Chart/type'
import DataActions from './Chart/DataControls'
import ControlButton from './Chart/ControlButton'


function App() {



  const [addedPeers, setAddedPeers] = useState<number[]>([])

  const [generatorInterval, setGeneratorInterval] = useState<ReturnType<typeof setInterval> | null>()

  const [data1, setData1] = useState<ItemType[]>([])
  const [data2, setData2] = useState<ItemType[]>([])

  const [timer, setTimer] = useState(0)

  const start = useCallback(() => {
    if (generatorInterval) return;
    setGeneratorInterval(setInterval(() => {
      const value1 = Math.round(Math.random() * 10)
      const value2 = Math.round(Math.random() * 10)

      setAddedPeers([value1, value2])

      setData1(data => [...data, { value: value1, id: v4() },])
      setData2(data => [...data, { value: value2, id: v4() },])

      setTimeout(() => {
        setAddedPeers([])
      }, 700);

      setTimer(timer => timer + 1);
    }, 1000))
  }, [generatorInterval, data1])

  const stop = useCallback(() => {
    generatorInterval && clearInterval(generatorInterval)
    setGeneratorInterval(null)
    setAddedPeers([])
  }, [generatorInterval])

  const reset = () => {
    setData1([])
    setData2([])
    setTimer(0)
  }

  return (
    <div className="flex flex-col items-center justify-center"> 
      <div className='flex select-none font-bold mx-auto scale-150 w-fit translate-y-1/2 gap-4'>

        <div className="flex flex-col gap-2">
          <div className="chart-wrapper">
            <Chart title="Channel 1" data={data1} />
          </div>
          <DataActions data={data1} setData={setData1} />
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <AnimatePresence>
            {generatorInterval && <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p> Seconds : {timer} </p>
              <div className="flex justify-center h-[3rem] w-full text-[1.5rem] font-black gap-4">
                <h3>{addedPeers?.[0]} </h3>
                {addedPeers.length > 0 && <span> | </span>}
                <h3>  {addedPeers?.[1]} </h3>
              </div>
            </motion.div>}
          </AnimatePresence>


          <ControlButton onClick={start} disabled={generatorInterval != null} bgClass="bg-green-400" icon={<IconPlay />}> Start </ControlButton>
          <ControlButton onClick={stop} disabled={generatorInterval == null} bgClass="bg-red-400" icon={<IconPause />}> Stop </ControlButton>
          <ControlButton onClick={reset} disabled={generatorInterval != null} bgClass="bg-orange-400" icon={<IconReset />}> RESET </ControlButton>

        </div>

        <div className="flex flex-col gap-2">
          <div className="chart-wrapper">
            <Chart title="Channel 2" data={data2} />
          </div>
          <DataActions data={data2} setData={setData2} />
        </div>

      </div>
    </div>
  )
}

export default App
