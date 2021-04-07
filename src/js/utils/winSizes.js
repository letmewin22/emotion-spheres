export const winSizes = () => {
  const vh = window.innerHeight
  const vw = window.innerWidth
  document.body.style.setProperty('--vh', `${vh}px`)
  document.body.style.setProperty('--vw', `${vw}px`)
}


