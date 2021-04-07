import {state} from '../state'
import {isFixed} from './isFixed'
import {raf} from './RAF'

export default class NavbarPos {
  constructor() {
    this.mouseFunc = e => {
      this.mouseHandler(e)
    }
  }

  init() {
    this.scrollPos = 0
    raf.on(this.scrollNav.bind(this))
  }

  mouseHandler(e) {
    if (e.screenY <= document.querySelector('.navbar').scrollHeight + 100) {
      document.body.classList.remove('nav-hidden')
      state.popup = true
    } else document.body.classList.add('nav-hidden')
  }

  scrollNav() {
    const b = {
      top: -state.scrolled,
    }
    const flScrollPos = Math.floor(Math.abs(this.scrollPos))

    if (b.top > this.scrollPos || isFixed()) {
      document.body.classList.remove('nav-hidden')
      document.removeEventListener('mousemove', this.mouseFunc)
      state.popup = true
    }

    if ((b.top < this.scrollPos && this.scrollPos <= 0) || !state.popup) {
      document.body.classList.add('nav-hidden')
      document.querySelector('.navbar').classList.remove('remove-bg')

      document.addEventListener('mousemove', this.mouseFunc)
    }

    if (!flScrollPos) {
      document.querySelector('.navbar').classList.add('remove-bg')
      state.popup = true
    }

    this.scrollPos = -state.scrolled
  }

  destroy() {
    this.scrollPos = 0
    raf.off(this.scrollNav.bind(this))
  }
}
