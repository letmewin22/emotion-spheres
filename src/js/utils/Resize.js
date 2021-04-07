class Resize {
  constructor() {
    this.cbArray = []
    this.init()
  }

  bounds() {
    ['resizeHandler', 'debounce'].forEach(fn => {
      this[fn] = this[fn].bind(this)
    })
  }

  init() {
    this.bounds()
    this.debounced = this.debounce(this.resizeHandler, 60)
    window.addEventListener('resize', this.debounced)
  }

  resizeHandler() {
    this.cbArray.forEach(cb => cb())
  }

  on(cb) {
    cb()
    this.cbArray.push(cb)
  }

  off(cb) {
    this.cbArray = this.cbArray.filter(e => e !== cb)
  }

  debounce(func, wait = 100) {
    let timeout
    return function(...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func.apply(null, ...args)
      }, wait)
    }
  }

  destroy() {
    window.removeEventListener('resize', this.debounced)
  }
}

const resizeInstance = new Resize()

export const resize = {
  on: cb => resizeInstance.on(cb),
  off: cb => resizeInstance.off(cb)
}
