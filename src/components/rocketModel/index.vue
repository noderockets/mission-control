<template>
  <canvas :width="width" :height="height" :rotation="rocketData.gyroscope"/>
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
        default: '500px',
        type: String
      },
      rocketData: {
        type: Object,
        default: {}
      },
      width: {
        default: '500px',
        type: String
      }
    },
    mounted () {
      const loadControls = false
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xe8e8e8)

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      )

      camera.position.x = 0
      camera.position.y = 0
      camera.position.z = 10

      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(renderer.domElement)

      getRocketModel()
        .then(rocketModel => {
          this.rocketModel = rocketModel
          scene.add(this.rocketModel)

          loadLight(scene)

          const render = function() {
            requestAnimationFrame(render)
            renderer.render(scene, camera)
          }

          render()
        })
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
    }
  }
</script>

<style scoped>
</style>
