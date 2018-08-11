<template>
  <button class="button" @click="onClick">{{label}}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: String
  },
  methods: {
    onClick() {
      this.$emit("click")
    }
  }
}
</script>

<style scoped>
.button {
  color: #fff;
  background-color: #6ebd4f;
  border-radius: 8px;
  border: 1px solid #c0c0c0;
  font-size: 16px;
  height: 50px;
}
</style>
