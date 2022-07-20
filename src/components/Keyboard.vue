<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.js'

const board = useBoardStore()

const rows = [
  'QWERTYUIOP'.split(''),
  'ASDFGHJKLÇ'.split(''),
  [...'ZXCVBNM'.split(''), 'Backspace']
]

const vowels = 'AEIOU'.split('')

const { letters, keysDisabled, solving, solved, failed } = storeToRefs(board)

const isKeyDisabled = (key) => {
  // Only one vowel is allowed
  const isVowel = vowels.includes(key)
  const hasVowels = letters.value.some(letter => (vowels.includes(letter)))

  return letters.value.includes(key)
    || keysDisabled.value
    || (isVowel && hasVowels && !solving.value)
}

const handleLetter = (key) => {
  if (solving.value) {
    if (key === 'Backspace') {
      board.backspace()
    } else {
      board.enterSolution(key)
    }
  } else {
    selectLetter(key)
  }
}

const selectedLetter = ref(null)
const selectLetter = (key) => {
  if (key === 'Backspace') {
    selectedLetter.value = null
  } else {
    selectedLetter.value = key
  }
}

const enterLetter = () => {
  board.enterLetter(selectedLetter.value)
  selectedLetter.value = null
}

const solve = () => {
  board.solve()
}

const enterSolveMode = () => {
  board.enterSolveMode()
}
</script>

<template>
  <div id="keyboard">
    <div class="row" :key="i" v-for="(row, i) in rows">
      <div class="spacer" v-if="i === 2"></div>
      <button class="button" v-for="key in row" :key="key" @click="handleLetter(key)" :disabled="isKeyDisabled(key)"
        :class="[selectedLetter === key && 'selected', key.toLowerCase()]">
        <span v-if="key !== 'Backspace'">{{ key }}</span>
        <svg v-else xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path fill="currentColor"
            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z">
          </path>
        </svg>
      </button>
      <div class="spacer" v-if="i === 2"></div>
    </div>
  </div>

  <div v-if="solving">
    <button class="solve-button solve-button-confirm" @click="solve">Resoldre el panell</button>
  </div>
  <div v-else-if="selectedLetter">
    <button class="solve-button solve-button-letter" @click="enterLetter">Compra la {{ selectedLetter }}</button>
  </div>
  <div v-else>
    <button class="solve-button solve-button-solution"  @click="enterSolveMode">Resoldre!</button>
  </div>

  Solved: {{ solved }}
  Failed: {{ failed }}
</template>

<style lang="scss" scoped>
#keyboard {
  user-select: none;
  margin: .5rem 0;
}
.row {
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  gap: .5rem;
  width: 100%;
  margin-top: .5rem;
  touch-action: manipulation;
}

.button {
  font-size: var(--font-size-md);
  border: 0;
  padding: 0;
  height: 4rem;
  width: 100%;
  border-radius: .5rem;
  background-color: var(--white);
  color: var(--black);
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  user-select: none;

  &:disabled {
    opacity: .6;
  }
}

.solve-button {
  font-size: var(--font-size-md);
  width: 100%;
  border-radius: .5rem;
  height: 4rem;

  &-letter {
    background: var(--blue);
    color: var(--white);
  }
  
  &-solution,
  &-confirm {
    background: var(--red);
    color: var(--white);
  }
}

.selected:not(:disabled) {
  border: 4px var(--blue) solid;
  color: var(--blue)
}
</style>