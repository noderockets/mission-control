<template>
  <canvas ref="canvas" :width="width" :height="height" :rotation="rocketData.gyroscope"/>
</template>

<script>
  import * as THREE from 'three'
  import * as AHRS from 'ahrs'
  import { get } from 'lodash'

  import loadLight from './loaders/light'
  import getRocketModel from './loaders/rocket'

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
        default: {}
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
      this.scene.background = new THREE.Color(0xe8e8e8)
      this.camera = new THREE.PerspectiveCamera(
        75,
        this.width / this.height,
        0.1,
        10000
      )
      this.camera.position.x = 0
      this.camera.position.y = 0
      this.camera.position.z = 10
      this.renderer = new THREE.WebGLRenderer({ canvas: this.$refs.canvas })
      this.rocketModel = await getRocketModel()
      this.scene.add(this.rocketModel)
      loadLight(this.scene)
      this.renderer.render(this.scene, this.camera)
    },
    updated () {
      const curTimeStamp = get(this.rocketData, 'timestamp', Date.now())
      const prevTimeStamp = get(this.prevRocketData, 'timestamp', Date.now())

      const timeElapsed = (curTimeStamp - prevTimeStamp) / 1000 // Seconds


      // #### Solution 1 ####
      // const rotation = (val, elapsedSeconds) => {
      //   const scalar = 14.375
      //   return (val * elapsedSeconds) / scalar
      // }

      // const curX = get(this.rocketData.gyroscope, 'x', 0)
      // const curY = get(this.rocketData.gyroscope, 'y', 0)
      // const curZ = get(this.rocketData.gyroscope, 'z', 0)
      // this.rocketModel.rotation.x = toRadians(rotation(curX, timeElapsed))
      // this.rocketModel.rotation.y = toRadians(rotation(curY, timeElapsed))
      // this.rocketModel.rotation.z = toRadians(rotation(curZ, timeElapsed))
      // #### Solution 1 ####

      // #### Solution 2 ####
      const gyro = get(this.rocketData, 'gyroscope', {})
      const accel = get(this.rocketData, 'accelerometer', {})
      const compass = get(this.rocketData, 'magnetometer', {})

      madgwick.update(gyro.x, gyro.y, gyro.z, accel.x, accel.y, accel.z, compass.x, compass.y, compass.z, timeElapsed)
      const updates = madgwick.toVector()

      this.rocketModel.rotation.x = get(updates, 'x', 0)
      this.rocketModel.rotation.y = get(updates, 'y', 0)
      this.rocketModel.rotation.z = get(updates, 'z', 0)
      // #### Solution 2 ####

      this.prevRocketData = this.rocketData
      this.renderer.render(this.scene, this.camera)
    }
  }
</script>

<style scoped>
</style>
