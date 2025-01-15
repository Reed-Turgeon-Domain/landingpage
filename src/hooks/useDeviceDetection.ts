import * as detectIt from 'detect-it'

export const useDeviceDetection = () => {
  const isTouchOnly = detectIt.primaryInput === 'touch'
  const isMouseOnly = detectIt.primaryInput === 'mouse'
  const isHybrid = detectIt.primaryInput === 'hybrid'
  const hasTouch = detectIt.hasTouch

  // For responsive design breakpoints
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const isTablet = typeof window !== 'undefined' && 
    window.innerWidth > 768 && window.innerWidth <= 1024

  return {
    isTouchOnly,    // true if device only uses touch (like most phones)
    isMouseOnly,    // true if device only uses mouse (like most desktops)
    isHybrid,       // true if device has both (like some laptops with touch screens)
    hasTouch,       // true if device has touch capability at all
    isMobile,       // true if screen width <= 768px
    isTablet        // true if screen width > 768px and <= 1024px
  }
} 