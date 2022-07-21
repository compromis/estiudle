<script setup>
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.js'

const board = useBoardStore()
const { panel, solving, firstAvailableSlotInSolution } = storeToRefs(board)

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
</script>

<template>
<pre>
  Panel: {{ panel }}
  Computed: {{ computedPanel }}
  </pre>
  <div class="panel">
    <div class="row">
      <span v-for="i in 9" :key="i" class="slot empty" />
    </div>
    <div v-for="(row , i) in computedPanel" :key="i" class="row">
      <span v-for="(letter, l) in row" :key="i + l" :class="['slot', { empty: letter === 'empty' || letter === ' ' }]">
        {{ letter === 'empty' ? '' : letter }}
      </span>
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
  }
</style>