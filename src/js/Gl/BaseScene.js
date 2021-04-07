import * as THREE from 'three'

export default class BaseScene {
  constructor($selector) {
    this.$container = document.querySelector($selector)

    this.sizes = {
      w: window.innerWidth,
      h: window.innerHeight,
    }

    this.time = 0
  }

  init() {
    this.scene = new THREE.Scene()

    this.setupCamera()

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })

    this.renderer.setSize(this.sizes.w, this.sizes.h)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xd3d3d3, 0)

    this.$container.appendChild(this.renderer.domElement)
  }

  setupCamera() {}

  resize() {
    this.sizes = {...this.sizes, w: window.innerWidth, h: window.innerHeight}

    this.setupCamera()

    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.sizes.w, this.sizes.h)
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }

  animate() {
    this.time++
    this.renderer.render(this.scene, this.camera)
  }
  destroy() {}
}
