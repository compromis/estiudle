<script setup>
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board'
import { computed } from 'vue'

const board = useBoardStore()
const { maxLetters, letterBoard, finished } = storeToRefs(board)
</script>

<template>
  <ul class="letter-board" v-if="!finished">
    <li v-for="(letter, i) in letterBoard" :class="['letter', `letter-${letter.state}`]" :key="i">
      <span class="front"></span>
      <span class="back">{{ letter.letter }}</span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.letter-board {
  list-style: none;
  padding: .4rem .3rem;
  width: fit-content;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background: var(--white);
  border-radius: var(--border-radius);
  transform: scale(.8);

  .letter {
    position: relative;
    margin: 0 .15rem;
    padding: 0;
    height: clamp(2.15rem, 9vw, 5rem);
    width: clamp(1.8rem, 7vw, 4rem);

    .front, .back {
      font-size: clamp(1.75rem, 7vw, 3.5rem);
      color: var(--black);
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      backface-visibility: hidden;
      transition: .75s ease-out;
    }

    .back {
      transform: rotateY(180deg);
    }

    &-not-in-solution {
      .back {
        background: var(--red);
        transform: rotateY(0deg);
      }

      .front {
        transform: rotateY(180deg);
      }
    }

    &-in-solution {
      .back {
        background: var(--lightblue);
        transform: rotateY(0deg);
      }

      .front {
        transform: rotateY(180deg);
      }
    }

    .front {
      background: var(--white);
      box-shadow: inset 0 0 0 clamp(3px, .25vw, 12px) var(--blue);
    }
  }
}
</style>