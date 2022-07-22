<script setup>
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board'
import { computed } from 'vue'

const board = useBoardStore()
const { maxLetters, letterBoard, finished } = storeToRefs(board)
</script>

<template>
  <ul class="letter-board" v-if="!finished">
    <li v-for="letter in letterBoard" :class="['letter', `letter-${letter.state}`]" :key="letter.letter">
      {{ letter.letter }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.letter-board {
  list-style: none;
  padding: .4rem .3rem;
  width: fit-content;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background: var(--white);
  border-radius: var(--border-radius);
  transform: scale(.8);

  .letter {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 .15rem;
    padding: 0;
    height: clamp(2.15rem, 9vw, 5rem);
    width: clamp(1.8rem, 7vw, 4rem);
    font-size: clamp(1.75rem, 7vw, 3.5rem);
    background: var(--lightblue);
    border-radius: var(--border-radius);
    color: var(--black);

    &-not-in-solution {
      background: var(--red);
    }

    &-empty {
      background: var(--white);
      box-shadow: inset 0 0 0 clamp(3px, .25vw, 12px) var(--blue);
    }
  }
}
</style>