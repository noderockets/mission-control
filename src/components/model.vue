<template>
  <canvas
    ref="canvas"
    :width="width"
    :height="height"
    :style="{'width': `${width}px`, 'height': `${height}px`}"
    :rotation="rocketData.gyroscope"
  />
</template>

<script>
  import * as THREE from 'three'
  import * as AHRS from 'ahrs'
  import { get } from 'lodash'

  import loadLight from './rocket-parts/loaders/light'
  import getRocketModel from './rocket-parts/loaders/rocket'

  const madgwick = new AHRS({
    sampleInterval: 20,
    algorithm: 'Madgwick',
    beta: 0.4
  })

  export default {
    name: 'Button',
    props: {
      height: {
        default: 500,
        type: Number
      },
      rocketData: {
        type: Object,
        default: () => ({})
      },
      width: {
        default: 500,
        type: Number
      }
    },
    data: () => ({
      rocketModel: null,
      scene: null,
      camera: null,
      renderer: null
    }),
    async mounted () {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
        75,
        this.width / this.height,
        0.1,
        10000
      )
      this.camera.position.x = 0
      this.camera.position.y = 0
      this.camera.position.z = 10
      this.renderer = new THREE.WebGLRenderer({ canvas: this.$refs.canvas, alpha: true })
      this.renderer.setClearColor(0xffffff, 0);
      this.rocketModel = await getRocketModel()
      this.scene.add(this.rocketModel)
      loadLight(this.scene)
      this.renderer.render(this.scene, this.camera)
    },
    updated () {
      const gyro = get(this.rocketData, 'gyroscope', {})
      const accel = get(this.rocketData, 'accelerometer', {})
      const compass = get(this.rocketData, 'magnetometer', {})
      madgwick.update(gyro.x / 1000, gyro.y / 1000, gyro.z / 1000, accel.x, accel.y, accel.z, compass.x, compass.y, compass.z)
      const { roll, pitch, heading } = madgwick.getEulerAngles()
      this.rocketModel.rotation.x = roll
      this.rocketModel.rotation.y = heading
      this.rocketModel.rotation.z = pitch
      this.prevRocketData = this.rocketData
      this.renderer.render(this.scene, this.camera)
    }
  }
</script>

<style scoped>
</style>
