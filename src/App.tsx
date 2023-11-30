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
  // generatorInterval is the interval which is used to generate the data
  const [generatorInterval, setGeneratorInterval] = useState<ReturnType<typeof setInterval> | null>()

  // count is the number of channels
  const [count, setCount] = useState(2)

  // data is the array of the data of the channels
  const [data, setData] = useState<ItemType[][]>([[], []])

  // timer is the timer for the generator
  const [timer, setTimer] = useState(0)

   //this use effect is using for that when we change the count value then it will add or remove the channel
  useEffect(() => { 
    // minimum channel count is 1
    if (count < 1) {
      setCount(1)
      return;
    }
    // tempData is the copy of the data
    const tempData = [...data]
    // if the count is greater than the data length then add the channel
    for (let i = 0; i < count; i++) {
      // if the channel is not present then add the channel
      const element = tempData[i];
      if (!element) {
        tempData.push([])
      }
    }
    // if the count is less than the data length then remove the channel
    tempData.length > count && tempData.splice(count, tempData.length - count)
    // set the data to render the chart
    setData(tempData)
  }, [count])

  // start function is used to start the generator
  // I used useCallback because I don't want to create the new function on every render
  const start = useCallback(() => {
    // if the generatorInterval is already present then return
    if (generatorInterval) return;
    // every second add the new value to the data
    setGeneratorInterval(setInterval(() => {
      // tempData is the copy of the data
      const tempData = [...data]
      for (let i = 0; i < data.length; i++) {
        const item = tempData[i];
        // it creates the random value and push it to the data
        const value = Math.round(Math.random() * 10)
        item.push({ value, id: v4() })
      }
      // set the data to render the chart
      setData(tempData)
      // increase the timer to render on seconds on the screen
      setTimer(timer => timer + 1);
    }, 1000))
  }, [generatorInterval, data])

  // stop function is used to stop the generator
  const stop = useCallback(() => {
    // if generatorInterval is setted then clear the interval
    generatorInterval && clearInterval(generatorInterval)
    // and clear the generatorInterval state
    setGeneratorInterval(null)
  }, [generatorInterval])

  // reset function is used to reset the data and timer
  const reset = useCallback(() => {
    setData(data.map(() => []))
    setTimer(0)
  },[])

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

        <ControlButton onClick={start} disabled={generatorInterval != null} bgClass="bg-green-400" icon={<IconPlay />}> Start </ControlButton>
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
                // this function will run when the user change the data with the load feature
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
