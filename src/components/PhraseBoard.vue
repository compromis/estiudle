<script setup>
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.js'

const board = useBoardStore()
const { letters } = storeToRefs(board)
const { todaysPhrase } = board
const specialChars = [' ', '\t', '\'']
</script>

<template>
  <div>
    <span v-for="(letter, i) in todaysPhrase.phrase" :key="i">
      <span v-if="letters.includes(letter) || specialChars.includes(letter)">
        {{ letter }}
      </span>
      <span v-else>
        _
      </span>
    </span>
  </div>
</template>