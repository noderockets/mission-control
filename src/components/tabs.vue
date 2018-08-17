<template>
  <div class="tabs">
    <ul>
      <li
        v-for="tab in tabs"
        :key="tab.title"
        @click="clicked(tab)"
        :class="{ visible: tab.visible }"
      >{{tab.title}}</li>
    </ul>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data: () => ({
    tabs: []
  }),
  methods: {
    clicked (tab) {
      const wasVisible = tab.visible
      this.tabs.forEach(tab => (tab.visible = false))
      if (!wasVisible) tab.visible = true
    }
  },
  created () {
    this.tabs = this.$children
  }
}
</script>

<style scoped>
.tabs {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  top: 1px;
}

li {
  background: white;
  border: 1px solid black;
  border-right: none;
  cursor: pointer;
  display: inline-block;
  padding: 10px 30px;
}

li:last-child {
  border-right: 1px solid black;
}

.visible {
  background: #ddd;
  border-bottom-color: white;
}
</style>
