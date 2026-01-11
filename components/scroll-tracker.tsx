'use client'

import { useEffect } from 'react'

export function ScrollTracker() {
  useEffect(() => {
    let ticking = false

    const updateScrollPosition = () => {
      document.documentElement.style.setProperty('--scroll-y', String(window.scrollY))
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateScrollPosition() // Set initial value

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
