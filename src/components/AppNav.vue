<script setup>
import { storeToRefs } from 'pinia'
import { useStatsStore } from '@/stores/stats.js'

const stats = useStatsStore()

const openStats = () => stats.openModal()
</script>

<template>
  <div class="app-nav">
    <button>Info</button>
    <div class="app-nav-logo">Estiudle</div>
    <button @click="openStats">Stats</button>
  </div>
</template>

<style lang="scss" scoped>
.app-nav {
  width: 100%;
  display: flex;
  line-height: 1;
  padding: 1rem 0;

  &-logo {
    font-size: var(--font-size-lg);
    margin: 0 auto;
  }

  button {
    color: var(--white);
    font-size: var(--font-size-md);
  }
}
</style>