<script setup>
import { storeToRefs } from 'pinia'
import { useStatsStore } from '@/stores/stats.js'
import StatsIcon from './icons/StatsIcon.vue'
import InstructionsIcon from './icons/InstructionsIcon.vue'

const stats = useStatsStore()

const toggleStats = () => stats.toggleStats()
const toggleInstructions = () => stats.toggleInstructions()
</script>

<template>
  <div class="app-nav">
    <button @click="toggleInstructions" title="Instruccions">
      <InstructionsIcon />
    </button>
    <div class="app-nav-logo">Estiudle</div>
    <button @click="toggleStats" title="Estadístiques">
      <StatsIcon />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.app-nav {
  width: 100%;
  display: flex;
  align-items: center;
  line-height: 1;
  margin-bottom: .75rem;

  &-logo {
    font-size: var(--font-size-md);
    margin: 0 auto;
  }

  button {
    color: var(--white);
    font-size: var(--font-size-md);
    line-height: 1;
  }
}
</style>