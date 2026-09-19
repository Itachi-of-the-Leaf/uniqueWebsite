import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis } from '@studio-freight/react-lenis'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export default function ScrollyTellingWrapper({ children, options = {} }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis's RAF via GSAP ticker
    const updateTicker = (time) => {
      // time from GSAP ticker is in seconds, convert to milliseconds for Lenis
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)

    // Disable lag smoothing to prevent desync between scroll and animations
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateTicker)
      lenis.off('scroll', ScrollTrigger.update)
    }
  }, [])

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        smoothWheel: true,
        ...options,
      }}
    >
      {children}
    </ReactLenis>
  )
}
