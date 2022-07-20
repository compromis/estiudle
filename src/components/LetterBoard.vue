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
  <span>{{letters}}</span>
</template>

<style lang="scss" scoped>
.letter-panel {
  list-style: none;
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: center;

  .letter {
    font-size: var(--font-size-md);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: .25rem;
    padding: 0;
    height: 3.5rem;
    width: 2.75rem;
    background: var(--white);
    border-radius: .5rem;
    color: var(--black);

    &-false{
      background: var(--red);
    }

    &-empty {
      background: var(--blue);
    }
  }
}
</style>