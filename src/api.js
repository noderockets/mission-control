import io from 'socket.io-client'

export default (opts = {}) => {
  const rocket = io(opts.rocketURL)
  return {
    onRocketData: cb => rocket.on('rocket-data', cb),
    onParachuteArmed: cb => rocket.on('parachute-armed', cb),
    onParachuteDisarmed: cb => rocket.on('parachute-disarmed', cb),
    onParachuteDeployed: cb => rocket.on('parachute-deployed', cb),

    onData: cb => {
      rocket.on('rocket-data', msg => cb('rocket-data', msg))
      rocket.on('parachute-armed', msg => cb('parachute-armed', msg))
      rocket.on('parachute-disarmed', msg => cb('parachute-disarmed', msg))
      rocket.on('parachute-deployed', msg => cb('parachute-deployed', msg))
    },

    deployParachute: () => rocket.emit('deploy-parachute'),
    armParachute: () => rocket.emit('arm-parachute'),
    disarmParachute: () => rocket.emit('disarm-parachute')
  }
}
