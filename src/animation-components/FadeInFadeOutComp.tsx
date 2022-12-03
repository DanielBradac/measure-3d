import { ReactNode, useEffect, useState } from 'react'

interface FadeInFadeOutCompProps {
  show: boolean
  children: ReactNode
  className?: string
}

const FadeInFadeOutComp = ({
  show,
  children,
  className,
}: FadeInFadeOutCompProps) => {
  const classNameStr = `${className ? className : ''} + ${
    show ? 'animate-fade-in-down' : 'animate-fade-out-up'
  }`
  const animationDuration = 450
  const [compVisible, setCompVisible] = useState<boolean>(true)

  useEffect(() => {
    if (show) {
      setCompVisible(true)
    } else if (compVisible) {
      // Disable component after animationDuration
      const timer = setTimeout(() => {
        setCompVisible(false)
      }, animationDuration)
      return () => {
        clearTimeout(timer)
      }
    }
  })

  // Render
  return <>{compVisible && <div className={classNameStr}>{children}</div>}</>
}

export default FadeInFadeOutComp
