class RAF {
  constructor() {
    this.cbArray = []
    this.animation()
  }

  on(cb) {
    this.cbArray.push(cb)
  }

  off(cb) {
    this.cbArray = this.cbArray.filter(e => e !== cb)
  }

  animation() {
    this.cbArray.forEach(cb => cb())
    requestAnimationFrame(this.animation.bind(this))
  }
}

const RAFInstance = new RAF()

export const raf = {
  on: cb => RAFInstance.on(cb),
  off: cb => RAFInstance.off(cb),
}
