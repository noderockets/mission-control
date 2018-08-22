<template>
  <div>
    <h3>Actions</h3>
    <Button @click="$emit('arm-parachute')" label="Arm Parachute" />
    <Button @click="$emit('disarm-parachute')" label="Disarm Parachute" />
    <Button @click="$emit('deploy-parachute')" label="Deploy Parachute" />
    <Button @click="$emit('reset-parachute')" label="Reset Parachute" />
  </div>
</template>

<script>
import Button from './button'

export default {
  name: 'Actions',
  components: {
    Button
  }
}
</script>

<style scoped>
</style>
