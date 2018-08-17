import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
import { get } from 'lodash'
import { toRadians } from '../utils/geometry'
import obj from '../model/rocket.obj'
import mtl from '../model/rocket.mtl'

export default () => {
  const position = { x: 0 }
  const rotation = { x: toRadians(180), y: toRadians(0), z: toRadians(0) }
  return loadModel({ position, rotation })
}

const loadModel = coords => {
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
