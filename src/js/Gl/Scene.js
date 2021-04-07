import * as THREE from 'three'
import * as OIMO from 'oimo'
import {raf, resize} from '@emotionagency/utils'

import Figure from './Figure'
import BaseScene from './BaseScene'

export default class Scene extends BaseScene {
  constructor($selector) {
    super($selector)

    this.init()
    this.bounds()

    raf.on(this.animate)
    resize.on(this.resize)
  }

  bounds() {
    ['animate', 'resize'].forEach((fn) => {
      this[fn] = this[fn].bind(this)
    })
  }

  init() {
    super.init()
    this.physics()
    this.figure = new Figure(this.scene, this.world)
  }

  physics() {
    this.world = new OIMO.World({
      timestep: 1 / 60,
      iterations: 8,
      broadphase: 3, // 1 brute force, 2 sweep and prune, 3 volume tree
      worldscale: 0.1, // scale full world
      random: true, // randomize sample
      // gravity: [6.8, -0.01, 0],
      gravity: [2.5, 0, 0],
    })

    this.ground = this.world.add({
      size: [40, 0.2, 40],
      pos: [0, -0.9, 0],
      density: 0.1,
      restitution: 1,
    })

    this.ceiling = this.world.add({
      size: [40, 0.2, 40],
      pos: [0, 0.9, 0],
      density: 0.1,
      restitution: 1,
    })

    this.left = this.world.add({
      size: [0.2, 40, 40],
      pos: [-1.5, 0, 0],
      density: 0.1,
      restitution: 1,
    })

    this.right = this.world.add({
      size: [1, 40, 40],
      pos: [2.1, 0, 0],
      density: 0.1,
      restitution: 1,
    })

    this.back = this.world.add({
      size: [40, 40, 1],
      pos: [0, 0, -2],
      density: 1,
      restitution: 1,
    })

    this.front = this.world.add({
      size: [40, 40, 1],
      pos: [0, 0, 2],
      density: 1,
      restitution: 1,
    })
  }

  setupCamera() {
    super.setupCamera()

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.sizes.w / this.sizes.h,
      0.01,
      1000,
    )
    this.camera.lookAt(this.scene.position)
    this.camera.position.z = 2
    this.camera.position.x = -0.5
  }

  resize() {
    super.resize()
  }

  animate() {
    this.world.step()
    this.figure.update()
    super.animate()
  }

  destroy() {
    this.figure.destroy()

    raf.off(this.animate)
    resize.off(this.resize)
    this.$container.removeChild(this.renderer.domElement)
  }
}
