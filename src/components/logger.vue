<template>
  <div>
    <div class="top-bar">
      <h3>Logs</h3>
      <button @click="pause">{{pauseText}}</button>
      <button @click="jumpToTop" :disabled="!scrolled">Jump to Top</button>
      <div>
        <label>Max Logs:</label>
        <input type="text" v-model="max" />
      </div>
    </div>
    <ul class="logs-list" ref="logsList">
      <li v-for="log in logs" v-bind:key="log.timestamp">{{log}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Logger',
  props: ['logStream'],
  data: () => ({
    logs: [],
    paused: false,
    scrolled: false,
    max: 10
  }),
  mounted () {
    this.logStream.$on('data', msg => {
      if (this.paused) return
      this.logs.unshift(msg)
      if (this.logs.length > this.max) this.logs.length = this.max
    })
    this.$refs.logsList.addEventListener('scroll', this.handleScroll)
  },
  computed: {
    pauseText () {
      return this.paused ? 'Resume Stream' : 'Pause Stream'
    }
  },
  methods: {
    pause () {
      this.paused = !this.paused
    },
    handleScroll () {
      this.scrolled = this.$refs.logsList.scrollTop > 0
    },
    jumpToTop () {
      this.$nextTick(() => {
        this.$refs.logsList.scrollTop = 0
      })
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 0;
}

.top-bar {
  display: flex;
  padding: 5px 0;
  margin-bottom: 5px;
  border-bottom: 1px solid;
}

.top-bar > * {
  margin-left: 40px;
}

.logs-list {
  height: calc(40vh - 38px);
  overflow: auto;
  margin: 0;
}
</style>
