import Scene from './Gl/Scene'

window.addEventListener('load', () => {
  setTimeout(() => {
    window.scene = new Scene('#gl')
  }, 500)
})
