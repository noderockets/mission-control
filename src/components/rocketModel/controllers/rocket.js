import { getKeys } from '../service/input'
import { get, set } from 'lodash'
import { toDegrees, toRadians } from '../service/geometry'

const ROLL_KEY = 82
const PITCH_KEY = 80
const YAW_KEY = 89
const SHIFT_KEY = 16

export const update = model => {
  const keys = getKeys()
  if (ROLL_KEY in keys) helper(model, 'y', SHIFT_KEY in keys)
  if (PITCH_KEY in keys) helper(model, 'x', SHIFT_KEY in keys)
  if (YAW_KEY in keys) helper(model, 'z', SHIFT_KEY in keys)
}

const helper = (model, key, decrement) => {
  let degrees = toDegrees(get(model, `rotation.${key}`))
  degrees = decrement ? ++degrees : --degrees
  set(model, `rotation.${key}`, toRadians(degrees))
}
