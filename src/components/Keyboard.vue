<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.js'
import BackspaceIcon from './icons/BackspaceIcon.vue'

const board = useBoardStore()

const rows = [
  'QWERTYUIOP'.split(''),
  'ASDFGHJKLÇ'.split(''),
  [...'ZXCVBNM'.split(''), 'Backspace']
]

const vowels = 'AEIOU'.split('')

const { 
  letters, keysDisabled, mustSolve,
  solving, solved, failed, finished,
  firstAvailableSlotInSolution
} = storeToRefs(board)

const isKeyDisabled = (key) => {
  // Only one vowel is allowed
  const isVowel = vowels.includes(key)
  const hasVowels = letters.value.some(letter => (vowels.includes(letter)))

  return letters.value.includes(key)
    || keysDisabled.value
    || (isVowel && hasVowels && !solving.value)
}

const selectedLetter = ref(null)
const selectLetter = (key) => {
  if (solving.value) {
    if (key === 'Backspace') {
      board.backspace()
    } else {
      board.enterSolution(key)
    }
  } else {
    if (key === 'Backspace') {
      selectedLetter.value = null
    } else {
      selectedLetter.value = selectedLetter.value === key ? null : key
    }
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
  selectedLetter.value = null
  board.enterSolveMode()
}

onMounted(() => {
  window.addEventListener('keypress', handleKeyStrokes)
})

const handleKeyStrokes = (e) => {
  const letters = 'qwertyuiopasdfghjklçzxcvbnm'.split('')
  if (letters.includes(e.key) && solving.value) {
    board.enterSolution(e.key.toUpperCase())
  } else if (letters.includes(e.key) && !solved.value) {
    selectedLetter.value = e.key.toUpperCase()
  }
}
</script>

<template>
  <div v-if="!finished">
    <div class="tutorial-text">
      <span v-if="solving">Escriu la solució</span>
      <span v-else>Tria fins a 4 consonants i una vocal</span>
    </div>

    <div class="keyboard">
      <div class="row" :key="i" v-for="(row, i) in rows">
        <div class="spacer" v-if="i === 2"></div>
        <button v-for="key in row" :key="key" @click="selectLetter(key)" :disabled="isKeyDisabled(key)"
          :class="['button', selectedLetter === key && 'selected', key.toLowerCase()]">
          <span v-if="key !== 'Backspace'">{{ key }}</span>
          <BackspaceIcon v-else />
        </button>
        <div class="spacer" v-if="i === 2"></div>
      </div>
    </div>

    <div class="buttons">
      <button
        v-if="solving"
        class="solve-button solve-button-confirm"
        @click="solve"
        :disabled="firstAvailableSlotInSolution !== -1">
        Resoldre el panell
      </button>
      <button
        v-if="!solving && !mustSolve"
        class="solve-button solve-button-letter"
        @click="enterLetter"
        :disabled="!selectedLetter">
        {{ selectedLetter ? `Compra la ${selectedLetter}` : 'Selecciona lletra' }}
      </button>
      <button
        v-if="!solving"
        class="solve-button solve-button-solution"
        @click="enterSolveMode">
        {{ !mustSolve ? 'Me la sé!' : 'Resoldre' }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.keyboard {
  user-select: none;
}

.row {
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  gap: clamp(.25rem, .5vw, .5rem);
  width: 100%;
  margin-top: clamp(.25rem, .5vw, .5rem);
  touch-action: manipulation;
}

.buttons {
  display: flex;
  gap: .5rem;

  .solve-button {
    flex-grow: 1;
  }
}

.button {
  font-size: var(--font-size-md);
  border: 0;
  padding: 0;
  height: clamp(3.25rem, 8vw, 4.5rem);
  width: 100%;
  border-radius: var(--border-radius);
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
  border-radius: var(--border-radius);
  height: 4rem;
  line-height: 1;
  margin-top: .5rem;

  &-letter {
    font-size: var(--font-size-sm);
    background: var(--blue);
    color: var(--white);
  }
  
  &-solution,
  &-confirm {
    background: var(--red);
    color: var(--white);
  }

  &:disabled {
    opacity: .6;
  }
}

.tutorial-text {
  text-align: center;
  font-size: var(--font-size-xs);
  line-height: 1;
  margin-bottom: 1rem;
}

.selected:not(:disabled) {
  border: 4px var(--blue) solid;
  color: var(--blue)
}
</style>