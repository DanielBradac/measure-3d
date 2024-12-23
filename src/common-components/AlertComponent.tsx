import { useEffect, useState } from 'react'
import FadeInFadeOutComp from '../animation-components/FadeInFadeOutComp'
import { AlertMessage, AlertType } from '../common/AlertMessageTypes'

interface AlertProps {
  type: AlertType
  message: string
}

// Component for one single alert
const Alert = ({ type, message }: AlertProps) => {
  const className = `animate-fade-in-down w-fit p-3 alert shadow-lg ${type}`

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
    <div className={`${className}`}>
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
        <div className='flex flex-col'>{message}</div>
      </>
    </div>
  )
}

interface AlertBlockProps {
  alerts: AlertMessage[]
  duration: number
}

// Component for and array of alerts
const AlertBlock = ({ alerts, duration }: AlertBlockProps) => {
  const fadeoutDuration = 450
  const [alertsVisible, setAlertsVisible] = useState<boolean>(true)

  // Trigger fadeout animation fadeoutDuration before alerts get removed
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertsVisible(false)
    }, duration - fadeoutDuration)
    return () => {
      clearTimeout(timer)
    }
  }, [alerts.length])

  // Render
  return (
    <FadeInFadeOutComp show={alertsVisible}>
      {alerts.map((alert, index) => {
        return (
          <div key={`Alert ${index}`} className='mb-2'>
            <Alert type={alert.type} message={alert.message} />
          </div>
        )
      })}
    </FadeInFadeOutComp>
  )
}

export default AlertBlock
