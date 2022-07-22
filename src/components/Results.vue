<script setup>
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.js'

const board = useBoardStore()
const { today, letters, finished, failed } = storeToRefs(board)

const share = () => {
  alert('share')
}
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
    <button class="button" @click="share">Comparteix</button>
    <div class="reveal">
      {{ today.reveal }}
    </div>
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
    margin-bottom: 1rem;
  }
}

.reveal {
  line-height: 1.1;
}
</style>