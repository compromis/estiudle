<script setup>
import { storeToRefs } from 'pinia'
import { useStatsStore } from '@/stores/stats.js'
import Modal from './Modal.vue'

const stats = useStatsStore()
const { stats: gameStats, statsOpen } = storeToRefs(stats)
</script>

<template>
  <Modal id="Stats" title="Estadístiques" v-model="statsOpen">
    {{ gameStats }}
  </Modal>
</template>

<style lang="scss" scoped>

</style>