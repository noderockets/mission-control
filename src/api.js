import io from 'socket.io-client'

const bind = (emitter, cb, types) => {
  types.forEach(type => {
    emitter.on(type, msg => {
      msg = msg || {}
      msg.type = type
      cb(msg)
    })
  })
}

export default (opts = {}) => {
  const rocket = io(opts.rocketURL)
  return {
    onRocketData: cb => rocket.on('rocket-data', cb),
    onParachuteArmed: cb => rocket.on('parachute-armed', cb),
    onParachuteDisarmed: cb => rocket.on('parachute-disarmed', cb),
    onParachuteDeployed: cb => rocket.on('parachute-deployed', cb),

    onData: cb => bind(rocket, cb, [
      'rocket-data',
      'parachute-armed',
      'parachute-disarmed',
      'parachute-deployed'
    ]),

    deployParachute: () => rocket.emit('deploy-parachute'),
    armParachute: () => rocket.emit('arm-parachute'),
    disarmParachute: () => rocket.emit('disarm-parachute')
  }
}
