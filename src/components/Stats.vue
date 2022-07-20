<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.js'
import { useStatsStore } from '@/stores/stats.js'

const board = useBoardStore()
const stats = useStatsStore()
const { today, letters, finished, failed } = storeToRefs(board)
const { modalOpen, stats: gameStats } = storeToRefs(stats)
const close = () => stats.closeModal()

watch(finished, (value) => {
  if (value) {
    stats.registerStats({ letters: letters.value, failed: failed.value })
    stats.openModal()
  }
})
</script>

<template>
  <div v-if="modalOpen">
    <button @click="close">Close</button>
    Share results
    <div>
      The answer was {{ today.phrase }}
      {{ today.reveal }}
    </div>
    <div>
      Stats: {{ gameStats }}
    </div>
  </div>
</template>