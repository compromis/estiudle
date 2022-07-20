<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.js'

const board = useBoardStore()
const { panel, solving, firstAvailableSlotInSolution } = storeToRefs(board)

onMounted(() => {
  board.startGame()
})
</script>

<template>
  <div>
    <span v-for="(letter, i) in panel" :key="i">
      <span v-if="letter !== ''">
        {{ letter }}
      </span>
      <span v-else>
        _
      {{ (i === firstAvailableSlotInSolution && solving) ? 'SELECTED' : '' }} 
      </span>
    </span>
  </div>
</template>