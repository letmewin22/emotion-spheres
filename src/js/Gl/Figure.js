import * as THREE from 'three'
// import gsap from 'gsap'

export default class Figure {
  time = 0
  rendering = false

  constructor(scene, world) {
    this.scene = scene
    this.world = world
    this.audio = new Audio('./audio/1.mp3')
    this.audio.volume = 0.1

    this.createMesh()

    // const pos0 = new THREE.Vector3(0, 0, 0)
    // const pos1 = {
    //   x: 0,
    // }
    // const pos2 = {
    //   x: 0,
    // }
    // document.body.onclick = () => {
    //   console.log(this.objects[0].body.position)
    //   gsap.to(pos0, {
    //     duration: 1,
    //     x: 0.6,
    //     overwrite: true,
    //     onUpdate: () => {
    //       console.log(this.objects[0].body.position)
    //       this.objects[0].body.setPosition(pos0)
    //     },
    //   })
    //   // gsap.to(this.objects[1].body.position, {
    //   //   duration: 1,
    //   //   x: this.objects[1].body.position.x + 2,
    //   //   overwrite: true,
    //   // })
    //   // gsap.to(this.objects[2].body.position, {
    //   //   duration: 1,
    //   //   x: this.objects[2].body.position.x - 2,
    //   //   overwrite: true,
    //   // })
    // }
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

    this.material = new THREE.MeshNormalMaterial()

    this.objects = []

    const mesh = new THREE.Mesh(this.geometry, this.material)

    const params = {
      type: 'sphere',
      size: [0.22, 0.22, 0.22],
      density: 2,
      restitution: 0.99,
      // belongsTo: 1,
      // collidesWith: 0xffffffff,
      move: true,
      noSleep: true,
    }

    const body = this.world.add({
      ...params,
      pos: [0, 0, 0],
      rot: [0, 0, -1],
    })

    this.objects.push({mesh, body})

    const mesh2 = new THREE.Mesh(this.geometry, this.material)

    const body2 = this.world.add({
      ...params,
      pos: [0, 0.6, 0],
      rot: [0, 0, 1],
    })

    this.objects.push({mesh: mesh2, body: body2})

    const mesh3 = new THREE.Mesh(this.geometry, this.material)

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
    // const m = this.mesh.material.uniforms
    // m.uTime.value = this.time

    this.objects.forEach((o) => {
      o.mesh.position.copy(o.body.getPosition())
    })
    // console.log(
    //   Math.abs(
    //     this.objects[0].mesh.position.x - this.objects[1].mesh.position.x,
    //   ),
    // )
    // if (
    //   Math.abs(
    //     this.objects[0].mesh.position.x - this.objects[1].mesh.position.x,
    //   ) <= 0.5
    // ) {
    //   this.audio.play()
    // }
    this.blackhole()
  }

  resize() {
    if (!this.rendering) {
      return
    }
  }

  blackhole() {
    let force
    const center = new THREE.Vector3(0, 0, 0)

    this.objects.forEach((o) => {
      force = o.mesh.position.clone().negate().normalize().multiplyScalar(9.1)
      o.body.applyImpulse(center, force)
    })
  }
}
