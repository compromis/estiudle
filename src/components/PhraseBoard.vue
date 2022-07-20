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
  const firstRow = thisPanel.splice(0, splitAt)
  const secondRow = thisPanel.splice(1)
  const rows = [firstRow, secondRow]

  return rows.map(row => {
    const surroundingSolts = 11 - row.length
    const addSlots = Math.floor(surroundingSolts / 2)

    for (let i = 0; i <= addSlots * 2; i++) {
      const addMethod = i > addSlots ? 'unshift' : 'push'
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
      <span v-for="(letter, l) in row" :key="i + l" class="slot">
        {{ letter === 'empty' ? '-' : letter }}
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
  }

  .slot {
    display: block;
    height: 20px;
    width: 20px;

    &.empty {
      background: blue;
    }
  }
</style>