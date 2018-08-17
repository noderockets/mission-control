<template>
  <div class="tab" v-show="visible">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: ['title'],
  data: () => ({
    visible: false
  })
}
</script>

<style scoped>
.tab {
  border: 1px solid black;
  background: white;
  height: 40vh;
}
</style>
