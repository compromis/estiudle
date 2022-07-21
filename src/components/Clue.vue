<script setup>
import { useBoardStore } from '@/stores/board.js'

const board = useBoardStore()
const { clue } = board
</script>

<template>
  <div class="clue">
    <div class="clue-content">
      {{ clue }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.clue {
  font-size: var(--font-size-sm);
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &-content {
    border-radius: .25rem;
    background: var(--white);
    color: var(--black);
    line-height: 1.1;
    padding: .4rem .6rem;
    margin: 0 auto;
  }

  &-title {
    text-transform: uppercase;
  }
}

</style>