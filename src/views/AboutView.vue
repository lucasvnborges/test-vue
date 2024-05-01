<template>
  <div class="about">
    <h1>{{ count }}</h1>
    <button @click="increment">increment</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { mapStores, mapState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default defineComponent({
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ['count'])
  },
    ...mapActions(useCounterStore, ['increment'])
  }
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
