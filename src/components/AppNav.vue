<script setup>
import { storeToRefs } from 'pinia'
import { useStatsStore } from '@/stores/stats.js'

const stats = useStatsStore()

const openStats = () => stats.openModal()
</script>

<template>
  <button @click="openStats">Stats</button>
</template>