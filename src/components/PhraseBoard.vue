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
      console.log(rowIndex, availableSlotInRow)
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
</template>

<style lang="scss" scoped>
  .panel {
    
  }

  .row {
    display: flex;
    gap: 1rem;
    margin: 1rem auto;
    justify-content: center;
  }

  .slot {
    display: block;
    height: 20px;
    width: 20px;
    background: white;
    color: black;

    &.empty {
      background: blue;
    }

    &.selected {
      border: 2px solid black;
    }

    &.filled {
      background: aquamarine;
    }
  }
</style>