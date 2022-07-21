<script setup>
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board'
import { computed } from 'vue'


const board = useBoardStore()
const { maxLetters } = board

const letters = computed(() => {
  const letters = board.lettersWithState
  while (letters.length < maxLetters) {
    letters.push({ letter: '', state: 'empty' })
  }
  return letters
})

</script>

<template>
  <ul class="letter-panel">
    <li v-for="letter in letters" :class="['letter', `letter-${letter.state}`]" :key="letter.letter">
      {{ letter.letter }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.letter-panel {
  list-style: none;
  padding: .5rem .4rem;
  width: fit-content;
  margin: .5rem auto;
  display: flex;
  justify-content: center;
  background: var(--white);
  border-radius: var(--border-radius);

  .letter {
    font-size: var(--font-size-md);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 .12rem;
    padding: 0;
    height: 3.5rem;
    width: 2.75rem;
    background: var(--lightblue);
    border-radius: var(--border-radius);
    color: var(--black);

    &-false{
      background: var(--red);
    }

    &-empty {
      background: var(--white);
      box-shadow: inset 0 0 0 4px var(--blue);
    }
  }
}
</style>