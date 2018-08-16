<template>
  <canvas :width="width" :height="height" />
</template>

<script>
  import * as THREE from 'three'
  import {update } from './controllers/rocket'
  
  import loadLight from './loaders/light'
  import { rocket1 } from './loaders/rocket'

  export default {
    name: 'Button',
    props: {
      rotation: {
        type: Object,
        default: {}
      },
      height: {
        default: '500px',
        type: String
      },
      width: {
        default: '500px',
        type: String
      }
    },
    methods: {
      onClick() {
        this.$emit("click")
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

      rocket1().then(rocketModel => {
        scene.add(rocketModel)
        loadLight(scene)
    
        const render = function() {
          requestAnimationFrame(render)
          renderer.render(scene, camera)
          update(rocketModel)
        }
    
        render()
      })
    }
  }
</script>

<style scoped>
</style>
