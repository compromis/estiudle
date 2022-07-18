<script setup>
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board'

const board = useBoardStore()

const { lettersWithState } = storeToRefs(board)
</script>

<template>
  <div>
    State: {{ lettersWithState }}
  </div>
</template>