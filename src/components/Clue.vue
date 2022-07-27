<script setup>
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.js'

const board = useBoardStore()

const { clue, finished } = storeToRefs(board)
</script>

<template>
  <div class="clue" v-if="!finished">
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
  margin-top: 1rem;

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