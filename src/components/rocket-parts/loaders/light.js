import * as THREE from 'three'

export default function(scene) {
  const keyLight = new THREE.DirectionalLight(
    new THREE.Color('hsl(30, 100%, 75%)'),
    0.5
  )
  keyLight.position.set(-100, 0, 100)

  const fillLight = new THREE.DirectionalLight(
    new THREE.Color('hsl(240, 100%, 75%)'),
    1.0
  )
  fillLight.position.set(100, 0, 100)

  const backLight = new THREE.DirectionalLight(0xffffff, 0.25)
  backLight.position.set(100, 0, 100).normalize()

  const ambientLight = new THREE.AmbientLight(0xffffff)

  scene.add(keyLight)
  scene.add(fillLight)
  scene.add(backLight)
  scene.add(ambientLight)
}
