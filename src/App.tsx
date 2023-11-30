import { useState, useCallback, useEffect } from 'react'
import { v4 } from 'uuid'
import { AnimatePresence, motion } from 'framer-motion'
import { FaPlay as IconPlay, FaPause as IconPause, FaRedo as IconReset } from 'react-icons/fa'

import Chart from './components/Chart/Chart'
import { ItemType } from './components/Chart/type'
import DataActions from './components/Chart/DataControls'
import ControlButton from './components/Chart/ControlButton'
import InputCount from './components/InputCount'


function App() {

  const [generatorInterval, setGeneratorInterval] = useState<ReturnType<typeof setInterval> | null>()

  const [count, setCount] = useState(2)

  const [data, setData] = useState<ItemType[][]>([[], []])

  useEffect(() => {
    if (count < 1) {
      setCount(1)
      return;
    }
    const tempData = [...data]
    for (let i = 0; i < count; i++) {
      const element = tempData[i];
      if (!element) {
        tempData.push([])
      }
    }
    tempData.length > count && tempData.splice(count, tempData.length - count)
    setData(tempData)
  }, [count])

  const _start = useCallback(() => {
    if (generatorInterval) return;
    setGeneratorInterval(setInterval(() => {
      const tempData = [...data]
      for (let i = 0; i < data.length; i++) {
        const item = tempData[i];
        const value = Math.round(Math.random() * 10)
        item.push({ value, id: v4() })
      }
      setData(tempData)

      setTimer(timer => timer + 1);
    }, 1000))
  }, [generatorInterval, data])


  const [timer, setTimer] = useState(0)


  const stop = useCallback(() => {
    generatorInterval && clearInterval(generatorInterval)
    setGeneratorInterval(null)
  }, [generatorInterval])

  const reset = () => {
    setData(data.map(() => []))
    setTimer(0)
  }

  return (
    <div className="flex relative flex-col items-center gap-8 justify-center">

      <div className="flex sticky w-full border-2 top-0 bg-white z-[1] items-center justify-center gap-4">
        <AnimatePresence>
          {generatorInterval && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p> Seconds : {timer} </p>
          </motion.div>}
        </AnimatePresence>

        <ControlButton onClick={_start} disabled={generatorInterval != null} bgClass="bg-green-400" icon={<IconPlay />}> Start </ControlButton>
        <ControlButton onClick={stop} disabled={generatorInterval == null} bgClass="bg-red-400" icon={<IconPause />}> Stop </ControlButton>
        <ControlButton onClick={reset} disabled={generatorInterval != null} bgClass="bg-orange-400" icon={<IconReset />}> RESET </ControlButton>
        <InputCount disabled={generatorInterval != null} value={count} setValue={setCount} />

      </div>

      <div className='flex select-none justify-center flex-wrap font-bold mx-auto w-full gap-4'>

        {
          data.map((item, i) => (
            <div className="flex flex-col gap-2 py-4" key={i}>
              <div className="chart-wrapper">
                <Chart title={`Channel ${i + 1}`} data={item} />
              </div>
              <DataActions data={item} setData={(value) => {
                const _tempData = [...data]
                _tempData[i] = value
                setData(_tempData)
              }} />
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default App
