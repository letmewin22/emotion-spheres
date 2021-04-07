import * as THREE from 'three'
import gsap from 'gsap'
import {fresnelShader} from './FresnelShader'

import fragmentShader from './shaders/particles/fragment.glsl'
import fragmentMobileShader from './shaders/particles/fragmentMobile.glsl'
import vertexShader from './shaders/particles/vertex.glsl'
import {fluidSize} from '@/utils/fluidSize'

export default class Figure {
  time = 0
  rendering = false
  blackholeGravity = {value: 9.1}

  constructor(scene, world) {
    this.scene = scene
    this.world = world

    this.createMesh()

    document.body.onclick = () => {
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
  }

  createMesh() {
    this.rendering = true

    this.geometry = new THREE.SphereGeometry(
      0.22,
      50,
      50,
      0,
      Math.PI * 2,
      0,
      Math.PI * 2,
    )

    const path = './img/world/'
    const format = '.jpg'
    const urls = new Array(6)
      .fill(0)
      .map((url) => (url = path + 'particles' + format))

    this.textureCube = new THREE.CubeTextureLoader().load(urls)

    const fShader = fresnelShader
    const uniforms = THREE.UniformsUtils.clone(fShader.uniforms)
    uniforms.tCube.value = this.textureCube

    this.material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: fShader.vertexShader,
      fragmentShader: fShader.fragmentShader,
    })

    this.particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {value: 0},
        uIterations: {type: 'uint', value: fluidSize(128, 64)},
        ...uniforms,
      },
      vertexShader,
      fragmentShader:
        window.innerWidth > 960 ? fragmentShader : fragmentMobileShader,
    })

    this.objects = []

    const mesh = new THREE.Mesh(this.geometry, this.particleMaterial)

    const params = {
      type: 'sphere',
      size: [0.22, 0.22, 0.22],
      density: 2,
      restitution: 0.85,
      move: true,
    }

    const body = this.world.add({
      ...params,
      pos: [0, 0, 0],
      rot: [0, 0, -1],
    })

    this.objects.push({mesh, body})

    const mesh2 = new THREE.Mesh(this.geometry, this.particleMaterial)

    const body2 = this.world.add({
      ...params,
      pos: [0, 0.6, 0],
      rot: [0, 0, 1],
    })

    this.objects.push({mesh: mesh2, body: body2})

    const mesh3 = new THREE.Mesh(this.geometry, this.particleMaterial)

    const body3 = this.world.add({
      ...params,
      pos: [-0.6, 0, -0.3],
      rot: [0, 0, -45],
    })

    this.objects.push({mesh: mesh3, body: body3})

    this.scene.add(mesh)
    this.scene.add(mesh2)
    this.scene.add(mesh3)
  }

  update() {
    if (!this.rendering) {
      return
    }
    this.time++

    this.particleMaterial.uniforms.uTime.value = this.time

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
    this.particleMaterial.uniforms.uIterations.value = fluidSize(128, 64)
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
}
