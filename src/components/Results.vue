<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.js'
import { useStatsStore } from '@/stores/stats.js'

const board = useBoardStore()
const stats = useStatsStore()
const { today, letters, finished, failed } = storeToRefs(board)
const { modalOpen, stats: gameStats } = storeToRefs(stats)
const close = () => stats.closeModal()

watch(finished, (value) => {
  if (value) {
    stats.registerStats({ letters: letters.value, failed: failed.value })
    stats.openModal()
  }
})
</script>

<template>
  <div v-if="modalOpen" class="modal">
    <button @click="close" class="close-button">✕</button>
    <div class="modal-header modal-header-success" v-if="!failed">
      <div class="modal-header-title">Has encertat!</div>
      Comprant {{ letters.length }} <span v-if="letters.length === 1">lletra</span> <span v-else>lletres</span>
    </div>
    <div class="modal-header modal-header-failure" v-else>
      <div class="modal-header-title">Llàstima!</div>
      Torna a provar demà!
    </div>
    <button class="button">Comparteix</button>
    <div>
      {{ today.reveal }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
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

  .close-button {
    font-size: var(--font-size-sm);
    position: absolute;
    top: .25rem;
    right: .75rem;
  }
}
</style>