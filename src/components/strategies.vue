<template>
  <div>
    <ul>
      <li v-for="strategy in strategies" :key="strategy.key" :title="strategy.description">
        <input type="checkbox" :checked="strategy.data.enabled" @change="toggleStrategy(strategy)" />
        {{strategy.name}}
      </li>
    </ul>
    <div v-for="strategy in activeStrategies" :key="strategy.key">
      <h2>{{strategy.name}}</h2>
      <ul>
        <li v-for="(prop, key) in strategy.props" :key="key">
          <label :title="prop.description">{{key}}:</label>
          <input
            :type="prop.type === 'boolean' ? 'checkbox' : 'text'"
            :value="key in strategy.data.props ? strategy.data.props[key] : prop.default"
            :checked="key in strategy.data.props ? strategy.data.props[key] : prop.default"
            @change="updateStrategy(strategy, key, prop.type, $event)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Strategies',
  props: ['strategies'],
  computed: {
    activeStrategies () {
      return this.strategies.filter(strat => strat.data.enabled)
    }
  },
  methods: {
    toggleStrategy (strategy) {
      if (!strategy.data.enabled) this.$emit('activate-strategy', strategy.key)
      else this.$emit('deactivate-strategy', strategy.key)
    },
    updateStrategy (strategy, key, type, e) {
      const rawValue = type === 'boolean' ? e.target.checked : e.target.value
      const value = type === 'number' ? +rawValue : rawValue
      this.$emit('update-strategy', { strategyKey: strategy.key, key, value })
    }
  }
}
</script>

<style scoped>
</style>
