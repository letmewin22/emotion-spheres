import * as THREE from 'three'
import gsap from 'gsap'
import {fresnelShader} from './FresnelShader'

import fragmentShaderPC from './shaders/particles/fragmentPC.glsl'
import fragmentShaderMobile from './shaders/particles/fragmentMobile.glsl'
import vertexShader from './shaders/particles/vertex.glsl'

export default class Figure {
  time = 0
  rendering = false
  blackholeGravity = {value: 9.1}

  sizes = new THREE.Vector2(window.innerWidth, window.innerHeight)

  constructor(scene, world) {
    this.scene = scene
    this.world = world

    this.createMesh()

    this.clickHandler = this.clickHandler.bind(this)

    document.body.addEventListener('click', this.clickHandler)
  }

  createBox() {
    // const baseURL = './img/world/'
    // const names = ['right', 'left', 'top', 'bottom', 'front', 'back']
    // const urls = new Array(6).fill('./img/22.png')
    // const urls = names.map((n) => baseURL + n + '.png')

    this.textureCube = new THREE.CubeTextureLoader().load(
      new Array(6).fill('./img/1.jpg'),
    )
    this.texture = new THREE.CubeTextureLoader().load(
      new Array(6).fill('./img/1.jpg'),
    )
  }

  createMesh() {
    this.rendering = true

    this.geometry = new THREE.SphereBufferGeometry(
      0.22,
      25,
      25,
      0,
      Math.PI * 2,
      0,
      Math.PI * 2,
    )

    // this.geometry = new THREE.IcosahedronBufferGeometry(0.22, 2)

    this.createBox()

    const uniforms = THREE.UniformsUtils.clone(fresnelShader.uniforms)
    uniforms.tCube.value = this.textureCube

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {value: 0},
        uTexture: {value: this.texture},
        uScreen: {value: this.sizes},
        ...uniforms,
      },
      vertexShader,
      fragmentShader:
        window.innerWidth > 960 ? fragmentShaderPC : fragmentShaderMobile,
    })

    this.objects = []

    const params = {
      type: 'sphere',
      size: [0.22, 0.22, 0.22],
      density: 2,
      restitution: 0.9,
      move: true,
    }

    const obj = [
      {pos: [0, -0.1, 0], rot: [0, 0, -1]},
      {pos: [0, 0.6, 0], rot: [0, 0, 1]},
      {pos: [-0.6, 0, -0.3], rot: [0, 0, -45]},
    ]

    obj.forEach((o) => {
      const mesh = new THREE.Mesh(this.geometry, this.material)
      const body = this.world.add({...params, ...o})

      this.objects.push({mesh, body})
      this.scene.add(mesh)
    })
  }

  clickHandler() {
    const tl = gsap.timeline({overwrite: true})
    tl.to(this.blackholeGravity, {
      duration: 0.6,
      value: -6.1,
    })
    tl.to(
      this.blackholeGravity,
      {
        duration: 0.6,
        value: 9.1,
      },
      0.6,
    )
  }

  update() {
    if (!this.rendering) {
      return
    }
    this.time++

    this.material.uniforms.uTime.value = this.time

    this.objects.forEach((o) => {
      o.mesh.position.copy(o.body.getPosition())
      o.mesh.quaternion.copy(o.body.getQuaternion())
    })

    this.blackhole()
  }

  resize() {
    if (!this.rendering) {
      return
    }

    this.sizes.x = window.innerWidth
    this.sizes.y = window.innerHeight

    this.material.uniforms.uScreen.value = this.sizes
  }

  blackhole() {
    let force
    const center = new THREE.Vector3(0, 0, 0)

    this.objects.forEach((o) => {
      force = o.mesh.position
        .clone()
        .negate()
        .normalize()
        .multiplyScalar(this.blackholeGravity.value)
      o.body.applyImpulse(center, force)
    })
  }

  destroy() {
    this.geometry.dispose()
    this.material.dispose()
    this.textureCube.dispose()

    this.objects.forEach((o) => {
      this.scene.remove(o.mesh)
      o.body.remove()
    })

    document.body.removeEventListener('click', this.clickHandler)
  }
}
