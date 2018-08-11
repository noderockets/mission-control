import io from 'socket.io-client'

export default (opts = {}) => {
  const rocket = io(`http://${opts.rocketIP}`)
  window.rocket = rocket
  return {
    onRocketData: (cb) => {
      rocket.on('rocket-data', cb)
    }
  }
}

// arm-parachute
// deploy-parachute
// rocket-data
