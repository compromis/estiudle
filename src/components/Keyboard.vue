<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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
const showKeyboard = ref(false)

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
  showKeyboard.value = false
}

const solve = () => {
  board.solve()
}

const enterSolveMode = () => {
  showKeyboard.value = true
  selectedLetter.value = null
  board.enterSolveMode()
}

onMounted(() => {
  window.addEventListener('keyup', handleKeyStrokes)
})

onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyStrokes)
})

const handleKeyStrokes = ({ key }) => {
  if (/^[a-zA-Z]$/.test(key)) {
    document.querySelector('.' + key).click()
  } else if (key === 'Backspace') {
    document.querySelector('.backspace').click()
  } else if (key === 'Enter') {
    document.querySelector('.solve-button').click()
  }
}
</script>

<template>
  <div v-if="!finished" :class="['keyboard-wrapper', { 'show-keyboard' : showKeyboard }]">
    <div class="keyboard">
      <div class="buttons-inside">
        <template v-if="solving">
          <Transition name="slide-down" mode="out-in">
            <div class="tutorial-text" v-if="firstAvailableSlotInSolution !== -1">
              Emplena el panell
            </div>
            <button v-else class="solve-button solve-button-confirm" @click="solve">
              Resoldre
            </button>
          </Transition>
        </template>
        <template v-else>
          <Transition name="slide-down" mode="out-in">
            <div class="tutorial-text" v-if="!selectedLetter && !solving">
              Selecciona una lletra
            </div>
            <button v-else class="solve-button solve-button-letter" @click="enterLetter">
              {{ `Compra la ${selectedLetter}` }}
            </button>
          </Transition>
        </template>
      </div>
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

    <Transition name="slide-down">
      <div class="buttons-outside" v-if="!showKeyboard">
        <button class="solve-button solve-button-letter" @click="showKeyboard = true">
          Comprar una lletra
        </button>
        <button v-if="!solving" class="solve-button solve-button-solution" @click="enterSolveMode">
          Me la sé!
        </button>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.keyboard {
  user-select: none;

  &-wrapper {
    position: relative;
    overflow: hidden;
  }
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

.buttons-outside {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: var(--orange);
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}

.buttons-inside {
  .solve-button {
      margin-top: 0;
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
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: var(--font-size-sm);
  line-height: 1;
  height: 4rem;
}

.selected:not(:disabled) {
  border: 4px var(--blue) solid;
  color: var(--blue)
}

.keyboard {
  transform: translateY(120px);
  opacity: 0;
  transition: .3s ease-out;
}

.show-keyboard .keyboard {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-enter-active, .slide-down-enter-active {
  transition: 0.25s ease-out;
}

.slide-up-leave-active, .slide-down-leave-active {
  transition: 0.25s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>