const keys = {}

document.addEventListener('keydown', ({ keyCode }) => (keys[keyCode] = true))
document.addEventListener('keyup', ({ keyCode }) => delete keys[keyCode])

export const getKeys = () => keys
