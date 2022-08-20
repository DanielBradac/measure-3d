import { useEffect, useState } from 'react'
import { AlertType } from '../common/Types'

interface AlertProps {
  type: string
  messages: string[]
  duration: number
}

const Alert = ({ type, messages, duration }: AlertProps) => {
  const className = `w-fit p-3 alert shadow-lg ${type}`

  const [animation, setAnimation] = useState<string>('animate-fade-in-down')

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation('animate-fade-out-up')
    }, duration - 500)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  let svgPath = 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  if (type === AlertType.SUCCESS) {
    svgPath = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  } else if (type === AlertType.WARNING) {
    svgPath =
      'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
  } else if (type === AlertType.ERROR) {
    svgPath =
      'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
  }

  // Render
  return (
    <div className={`${className} ${animation}`}>
      <>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='stroke-current flex-shrink-0 h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d={svgPath}
          />
        </svg>
        <div className='flex flex-col'>
          {messages.map((message, index) => (
            <div key={`Message ${index}`}>{message}</div>
          ))}
        </div>
      </>
    </div>
  )
}

export default Alert
