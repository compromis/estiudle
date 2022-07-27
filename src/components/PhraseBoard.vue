<script setup>
import { onMounted, computed, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.js'
import { gsap } from 'gsap'

const board = useBoardStore()
const { letters, lettersWithState, panel, solution, solving, solved, failed, finished } = storeToRefs(board)

// Start game
onMounted(() => {
  board.startGame()

  // Animate letters in case user returns mid-game or after solving
  animateLetters()
  if (finished) {
    animateSolved()
  }
})

// Animate panel solved
const animateSolved = () => {
  gsap.to(`.slot:not(.filled) .back`, {
    rotateY: '0deg',
    duration: .65,
    stagger: .4,
    delay: .3,
    ease: 'Power3.out'
  })

  gsap.to(`.slot:not(.filled) .front`, {
    rotateY: '180deg',
    duration: .65,
    stagger: .4,
    delay: .3,
    ease: 'Power3.out'
  })
}

watch(finished, (isFinished) => {
  if (isFinished) {
    animateSolved()
  }
}) 

// Animate letter reveal
const animateLetters = (letter) => {
  const parent = letter ? `.filled.letter-${letter.toLowerCase()}` : '.filled'
  gsap.to(`${parent} .back`, {
    rotateY: '0deg',
    duration: .65,
    stagger: .4,
    delay: .3,
    ease: 'Power3.out'
  })

  gsap.to(`${parent} .front`, {
    rotateY: '180deg',
    duration: .65,
    stagger: .4,
    delay: .3,
    ease: 'Power3.out'
  })
}

watch(letters, (newLetters) => {
  nextTick(() =>  animateLetters(newLetters[newLetters.length - 1]))
}, { deep: true }) 

// Animate panel shake
const animateShake = () => {
  gsap.to('.panel', { 
    x: "+=20", 
    yoyo: true, 
    repeat: 5,
    duration: 0.1
  })
  gsap.to('.panel', { 
    x: "-=20", 
    yoyo: true, 
    repeat: 5,
    duration: 0.1
  })
  gsap.fromTo('.panel .row', {
      background: 'var(--red)'
    },
    {
      background: 'var(--white)',
      duration: .5
    }
  )
}

watch(lettersWithState, ( newLetters ) => {
  const lastLetter = newLetters[newLetters.length - 1]
  if (lastLetter.state === 'not-in-solution') {
    animateShake()
  }
}, { deep: true })

// Compose panel
const composePanel = (source) => {
  const thisSource = [...source]
  const splitAt = thisSource.findIndex(row => row === '\n')
  let rows

  if (splitAt === -1) {
    rows = [thisSource, []]
  } else {
    const firstRow = thisSource.splice(0, splitAt)
    const secondRow = thisSource.splice(1)
    rows = [firstRow, secondRow]
  }

  return rows.map(row => {
    const surroundingSlots = 11 - row.length
    let slotsOnEachSide = Math.round(surroundingSlots / 2)

    const difference = surroundingSlots - (slotsOnEachSide * 2)
    slotsOnEachSide = slotsOnEachSide + difference

    for (let i = 1; i <= slotsOnEachSide * 2 - difference; i++) {
      const addMethod = i > slotsOnEachSide - difference ? 'unshift' : 'push'
      row[addMethod]('empty')
    }

    return row
  })

}

const panelToSolve = computed(() => composePanel(panel.value))
const solvedPanel = computed(() => composePanel(solution.value))

// Panel state
const isEmpty = (letter) => letter === 'empty' || letter === ' '

const isSelected = (row, slot) => {
  let firstAvailableSlot = null

  panelToSolve.value.forEach((row, rowIndex) => {
    if (!firstAvailableSlot) {
      const availableSlotInRow = row.findIndex(letter => letter === '')
      if (availableSlotInRow > -1) {
        firstAvailableSlot = [rowIndex, availableSlotInRow]
      }
    }
  })

  if (!firstAvailableSlot) {
    return false
  }

  const [rowIndex, slotIndex] = firstAvailableSlot

  return solving.value && rowIndex === row && slotIndex === slot
}

const isFilled = (letter) => letters.value.includes(board.removeLetterMarks(letter))
</script>

<template>
  <div :class="['panel', { solved, failed }]">
    <div class="row">
      <span v-for="i in 9" :key="i" class="slot empty" />
    </div>
    <div v-for="(row , r) in panelToSolve" :key="r" class="row">
      <template v-for="(letter, l) in row" :key="`${r}${l}`">
        <span v-if="isEmpty(letter)" class="empty slot"></span>
        <span
          v-else
          :class="['slot', 'fillable', `letter-${board.removeLetterMarks(solvedPanel[r][l].toLowerCase())}`, { selected: isSelected(r, l), filled: isFilled(letter) }]">
          <span class="front">{{ letter }}</span>
          <span class="back">{{ solvedPanel[r][l] }}</span>
        </span>
      </template>
    </div>
    <div class="row">
      <span v-for="i in 9" :key="i" class="slot empty" />
    </div>
  </div>
  <svg style="visibility: hidden; position: absolute;" width="0" height="0" xmlns="http://www.w3.org/2000/svg"
    version="1.1">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -9" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
</template>

<style lang="scss" scoped>
  .panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    filter: url('#goo');
    align-self: center;
    user-select: none;
  }

  .row {
    background: var(--white);
    padding: clamp(.2rem, .5vw, .5rem);
    width: fit-content;
    display: flex;
    gap: clamp(.2rem, .5vw, .5rem);
    margin-top: calc(clamp(.2rem, .5vw, .5rem) * -1);
  }

  .slot {
    height: clamp(2.15rem, 9vw, 5rem);
    width: clamp(1.8rem, 7vw, 4rem);
    position: relative;
    border-radius: var(--border-radius);

    &.empty {
      background: var(--blue);
      box-shadow: none;
    }

    .front, .back {
      font-size: clamp(1.75rem, 7vw, 3.5rem);
      color: var(--black);
      border-radius: var(--border-radius);
      box-shadow: inset 0 0 0 clamp(3px, .25vw, 12px) var(--blue);
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute; 
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      backface-visibility: hidden;
    }

    .back {
      transform: rotateY(180deg);
    }

    .front {
      background: var(--white);
    }

    &.filled .back {
      background: var(--lightblue);
      box-shadow: none;
    }

    &.filled .front {
      background: var(--orange);
      color: var(--orange);
      box-shadow: none;
    }

    &.selected .front {
      background: var(--orange);
    }
  }

    .solved {
      .slot:not(.empty) .back {
        box-shadow: none;
        background: var(--lightblue);
      }
    }
  
    .failed {
      .slot:not(.empty):not(.filled) .back {
        box-shadow: none;
        background: var(--red);
      }
    }
</style>