import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
import { get } from 'lodash'
import { toRadians } from '../service/geometry'
import obj from '../models/rocket1/rocket.obj'
import mtl from '../models/rocket1/rocket.mtl'

export const rocket1 = () => {
  const position = { x: 0 }
  const rotation = { x: toRadians(180), y: toRadians(0), z: toRadians(0) }
  return loadModel('rocket1', true, { position, rotation })
}

export const rocket2 = () => {
  const position = { y: -90 }
  const rotation = { x: toRadians(-67), y: toRadians(0) }
  return loadModel('rocket2', true, { position, rotation })
}

export const rocket3 = () => {
  const position = { y: 200 }
  const rotation = { x: toRadians(1.5), y: toRadians(0.5) }
  return loadModel('rocket3', false, { position, rotation })
}

export const rocket4 = () => {
  const position = { y: 200 }
  const rotation = { x: toRadians(1.5), y: toRadians(0.5) }
  return loadModel('rocket4', true, { position, rotation })
}

const loadModel = (path, hasMTL, coords) => {
  const { rotation, position } = coords

  return new Promise(resolve => {
    const mtlLoader = new MTLLoader()
    const objLoader = new OBJLoader()

    const materials = mtlLoader.parse(mtl)

    materials.preload()
    objLoader.setMaterials(materials)

    const object = objLoader.parse(obj)

    object.position.x = get(position, 'x', 0)
    object.position.y = get(position, 'y', 0)
    object.position.z = get(position, 'z', 0)

    object.rotation.x = get(rotation, 'x', 0)
    object.rotation.y = get(rotation, 'y', 0)
    object.rotation.z = get(rotation, 'z', 0)

    return resolve(object)
  })
}
