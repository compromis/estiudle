<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.js'
import { useStatsStore } from '@/stores/stats.js'

const board = useBoardStore()
const stats = useStatsStore()
const { todaysPhrase, finished } = storeToRefs(board)
const { modalOpen } = storeToRefs(stats)

const close = () => stats.closeModal()

watch(finished, (value) => {
  if (value) {
    // stats.registerStats()
    stats.openModal()
  }
})
</script>

<template>
  <div v-if="modalOpen">
    <button @click="close">Close</button>
    Share results
    <div>
      The answer was {{ todaysPhrase.phrase }}
      {{ todaysPhrase.reveal }}
    </div>
  </div>
</template>