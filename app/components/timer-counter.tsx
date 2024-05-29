'use client'
import { useState, type FC, useEffect } from 'react'

export const TimerCounter: FC = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setCount((prevCount) => prevCount + 1), 500)
    return () => {
      // クリーンアップ関数で、setIntervalを解除
      clearInterval(timer)
    }
  }, [])
  return (
    <div>
      <p>
        {count}
      </p>
      <button className="font-sm my-3 rounded bg-indigo-600 py-1 px-3 text-white hover:bg-indigo-700" onClick={() => setCount(0)}>reset</button>
    </div>
  )
}
