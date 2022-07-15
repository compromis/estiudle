<script setup>
import { useBoardStore } from '@/stores/board.js'

const board = useBoardStore()
const { todaysClue } = board
</script>

<template>
  <div>
    Today's clue: {{ todaysClue }}
  </div>
</template>