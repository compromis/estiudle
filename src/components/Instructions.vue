<script setup>
import { storeToRefs } from 'pinia'
import { useStatsStore } from '@/stores/stats.js'
import Modal from './Modal.vue'

const stats = useStatsStore()
const { instructionsOpen } = storeToRefs(stats)
</script>

<template>
  <Modal id="Instructions" title="Instruccions" v-model="instructionsOpen">
    Instructions
  </Modal>
</template>

<style lang="scss" scoped>

</style>