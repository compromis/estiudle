<script setup>
import { useBoardStore } from '@/stores/board.js'

const board = useBoardStore()
const { clue } = board
</script>

<template>
  <div>
    Today's clue: {{ clue }}
  </div>
</template>