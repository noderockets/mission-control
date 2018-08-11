<template>
  <div class="logs">
    <h3>Logs</h3>
    <ul>
      <li v-for="log in logs" v-bind:key="log.timestamp">{{log}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Logger',
  props: {
    logs: Array
  }
}
</script>

<style scoped>
.logs {
  border: 1px solid #000;
}
</style>
