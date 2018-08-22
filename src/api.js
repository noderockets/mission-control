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
    onStrategyData: cb => rocket.on('strategy-data', cb),
    onStrategyCustomEvent: cb => rocket.on('strategy-custom-event', cb),
    onStrategyLog: cb => rocket.on('strategy-log', cb),
    onStrategyError: cb => rocket.on('strategy-error', cb),

    onData: cb => bind(rocket, cb, [
      'rocket-data',
      'parachute-armed',
      'parachute-disarmed',
      'parachute-deployed',
      'strategy-data',
      'strategy-custom-event',
      'strategy-log',
      'strategy-error'
    ]),

    deployParachute: () => rocket.emit('deploy-parachute'),
    resetParachute: () => rocket.emit('reset-parachute'),
    armParachute: () => rocket.emit('arm-parachute'),
    disarmParachute: () => rocket.emit('disarm-parachute'),

    activateStrategy: key => rocket.emit('activate-strategy', key),
    updateStrategy: data => rocket.emit('update-strategy', data),
    deactivateStrategy: key => rocket.emit('deactivate-strategy', key)
  }
}
