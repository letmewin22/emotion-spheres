import {state} from '../state'
import {getRoute} from './getRoute'
import {isFixed} from './isFixed'
import {raf} from './RAF'

const themeBtn = () => {
  const scroller = document.getElementById('scroll-container')
  const bounds = scroller.getBoundingClientRect()

  const a = state.scrolled + window.innerHeight
  const b = bounds.height * 0.94
  const wh = window.innerHeight

  if (a >= b && !isFixed() && getRoute() !== 'contacts' && bounds.height > wh) {
    document.querySelector('.theme-btn').classList.add('disabled')
  } else {
    document.querySelector('.theme-btn').classList.remove('disabled')
  }
}

raf.on(themeBtn)

export default themeBtn
