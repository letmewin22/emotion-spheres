import * as THREE from 'three'
import * as OIMO from 'oimo'
import {raf, resize} from '@emotionagency/utils'

import Figure from './Figure'
import BaseScene from './BaseScene'
import {fluidSize} from '@/utils/fluidSize'

export default class Scene extends BaseScene {
  mouse = {
    destX: 0,
    destY: 0,
  }
  constructor($selector) {
    super($selector)

    this.bounds()
    this.init()

    raf.on(this.animate)
    resize.on(this.resize)
  }

  bounds() {
    ['animate', 'resize', 'onMousemove'].forEach((fn) => {
      this[fn] = this[fn].bind(this)
    })
  }

  init() {
    super.init()
    this.raycaster = new THREE.Raycaster()
    this.audio = new Audio('./audio/1.mp3')
    this.audio.volume = 0.1

    window.addEventListener('mousemove', this.onMousemove)

    this.physics()
    this.figure = new Figure(this.scene, this.world)
  }

  physics() {
    this.world = new OIMO.World({
      timestep: 1 / 60,
      iterations: 8,
      broadphase: 3,
      worldscale: 0.1,
      random: true,
      gravity: [2.5, 0, 0],
    })

    console.log(this.world)

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

  onMousemove(e) {
    const x = (e.clientX - this.sizes.w / 2) / (this.sizes.w / 2)
    const y = (e.clientY - this.sizes.h / 2) / (this.sizes.h / 2)
    this.mouse.destX = -x * 0.7
    this.mouse.destY = -y * 0.7
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
    this.camera.position.x = -0.6
  }

  resize() {
    super.resize()
    this.camera.position.z = fluidSize(2, 3.5)
    this.camera.position.x = fluidSize(-0.6, 0)
    this.camera.position.y = this.sizes.w < 960 ? -0.5 : 0
    this.world.setGravity([fluidSize(2.5, 0), 0, 0])
  }

  animate() {
    this.world.step()
    this.figure.update()

    const intersects = this.raycaster.intersectObjects(this.scene.children)

    for (let i = 0; i < intersects.length; i++) {
      // console.log(intersects[i])
      // this.audio.currentTime = 0
      // this.audio.play()
    }
    this.scene.rotation.x += (this.mouse.destY - this.scene.rotation.x) * 0.025
    this.scene.rotation.y += (this.mouse.destX - this.scene.rotation.y) * 0.025

    super.animate()
  }

  destroy() {
    window.removeEventListener('mousemove', this.onMousemove)
    this.figure.destroy()
    this.world.clear()
    this.world.stop()

    raf.off(this.animate)
    resize.off(this.resize)
    this.$container.removeChild(this.renderer.domElement)
  }
}
