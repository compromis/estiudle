<script setup>
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.js'

const board = useBoardStore()
const { letters, panel, solving, solved, failed } = storeToRefs(board)

onMounted(() => {
  board.startGame()
})

const computedPanel = computed(() => {
  const thisPanel = [...panel.value]
  const splitAt = thisPanel.findIndex(row => row === '\n')
  let rows

  if (splitAt === -1) {
    rows = [thisPanel, []]
  } else {
    const firstRow = thisPanel.splice(0, splitAt)
    const secondRow = thisPanel.splice(1)
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
})

const isEmpty = (letter) => letter === 'empty' || letter === ' '

const isSelected = (row, slot) => {
  let firstAvailableSlot = null

  computedPanel.value.forEach((row, rowIndex) => {
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

const isFilled = (letter) => letters.value.includes(letter)
</script>

<template>
  <div :class="['panel', { solved, failed }]">
    <div class="row">
      <span v-for="i in 9" :key="i" class="slot empty" />
    </div>
    <div v-for="(row , r) in computedPanel" :key="r" class="row">
      <template v-for="(letter, l) in row" :key="`${r}${l}`">
        <span v-if="isEmpty(letter)" :class="['slot', 'empty']" />
        <span v-else :class="['slot', { selected: isSelected(r, l), filled: isFilled(letter) }]">
          {{ letter }}
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
  }

  .row {
    background: var(--white);
    padding: clamp(.2rem, .5vw, .5rem);
    width: fit-content;
    display: grid;
    grid-template-rows: 1fr;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    gap: clamp(.2rem, .5vw, .5rem);
  }

  .slot {
    display: flex;
    text-align: center;
    line-height: 1;
    align-items: center;
    justify-content: center;
    height: clamp(2.25rem, 6vw, 5rem);
    width: clamp(1.75rem, 5vw, 4rem);
    font-size: var(--font-size-lg);
    color: var(--black);
    border-radius: var(--border-radius);
    outline: clamp(3px, .25vw, 12px) solid var(--blue);
    outline-offset: calc(clamp(3px, .1vw, 12px) * -1);

    &.empty {
      background: var(--blue);
      outline: none;
    }

    &.selected {
      outline: none;
      background: var(--orange);
    }

    &.filled {
      background: var(--lightblue);
      outline: none;
    }
  }

    .solved {
      .slot:not(.empty) {
        outline: none;
        background: var(--lightblue);
      }
    }
  
    .failed {
      .slot:not(.empty) {
        outline: none;
        background: var(--red);
      }
    }
</style>