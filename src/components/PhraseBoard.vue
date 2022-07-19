<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.js'

const board = useBoardStore()
const { allLetters, finished } = storeToRefs(board)
const { todaysPhrase, specialChars } = board
const letterShown = (letter) => {
  return allLetters.value.includes(letter)
    || specialChars.includes(letter) || finished.value
}

onMounted(() => {
  board.startGame()
})
</script>

<template>
  <div>
    <span v-for="(letter, i) in todaysPhrase.phrase" :key="i">
      <span v-if="letterShown(letter)">
        {{ letter }}
      </span>
      <span v-else>
        _
      </span>
    </span>
  </div>
  Finished: {{ finished }}
</template>