<script setup>
import { ref, watch } from 'vue'
import confetti from 'canvas-confetti'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.js'
import NextEstiudle from './NextEstiudle.vue'

const board = useBoardStore()
const { today, letters, maxLetters, letterBoard, finished, solved, failed } = storeToRefs(board)

// Share results
const copied = ref(false)
const share = () => {
  const day = new Date().getDate()

  const lettersUsed = failed.value ? 'X' : letters.value.length
  const letterScore = lettersUsed + '/' + maxLetters.value

  const squares = [...letterBoard.value].map(letter => {
    const states = {
      'in-solution': '🟧',
      'not-in-solution': '🟥',
      'empty': '🟩'
    }

    const emojis = {
      '0': '🏆',
      '1': '🎉',
      '2': '🙌',
      '3': '👏',
      '4': '🤪',
      '5': '😅',
      'X': '😵',
    }
    const emoji = emojis[lettersUsed]
  
    return states[letter.state]
  }).join('')

  const message = `#Estiudle #${day}\n${letterScore} ${squares}${emoji}\nestiudle.compromis.net`

  navigator.clipboard.writeText(message)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 4000)
}

// Throw confetti if solved
const throwConfetti = () => {
  const end = Date.now() + (5 * 1000)
  const colors = ['#34bdb3', '#e65f25', '#fff', '#C3E4D1', '#fc9ea3'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors
    })
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }())
}

watch(solved, (isSolved) => {
  if (isSolved) {
    throwConfetti()
  }
})
</script>

<template>
  <div v-if="finished" class="card">
    <div class="card-header card-header-success" v-if="!failed">
      <div class="card-header-title">Has encertat!</div>
      Comprant {{ letters.length }} {{ letters.length === 1 ? 'lletra' : 'lletres' }}
    </div>
    <div class="card-header card-header-failure" v-else>
      <div class="card-header-title">Llàstima!</div>
      Torna a provar demà!
    </div>
    <button class="button" @click="share">
      {{ copied ? 'Copiat!' : 'Comparteix' }}
    </button>
    <div class="reveal" v-html="today.reveal" />
    <NextEstiudle />
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  font-size: var(--font-size-sm);
  background: var(--white);
  color: var(--black);
  border-radius: var(--border-radius);
  padding: .5rem;
  text-align: center;

  &-header {
    margin: 1rem 0;
    
    &-title {
      font-size: var(--font-size-md);
      line-height: 1.1;
    }
  }

  .button {
    background: var(--blue);
    color: var(--white);
    font-size: var(--font-size-md);
    width: 100%;
    border-radius: var(--border-radius);
    height: 4rem;
  }
}

.reveal {
  line-height: 1.1;
  margin: 2rem 0;
}
</style>