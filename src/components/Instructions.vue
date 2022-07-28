<script setup>
import { storeToRefs } from 'pinia'
import { useStatsStore } from '@/stores/stats.js'
import Modal from './Modal.vue'

const stats = useStatsStore()
const { instructionsOpen } = storeToRefs(stats)
</script>

<template>
  <Modal id="Instructions" title="Instruccions" v-model="instructionsOpen">
    <p>Endevina la paraula o frase del dia comprant la menor quanitat de lletres. Cada dia trobaràs una nova!</p>
    <p>Pots comprar fins a 5 lletres si necessites ajuda. Només podràs comprar una vocal.</p>
    <p>Les lletres que es troben a la solució es mostraran al panell. Les que no s'hi troben es mostraran en roig.</p>
    <p>
      <span class="letter in-solution">A</span>
      <span class="letter not-in-solution">B</span>
    </p>
    <p>Quan sàpigues la resposta, selecciona "Me la sé!"</p>
  </Modal>
</template>

<style lang="scss" scoped>
  p {
    font-size: var(--font-size-xs);
    margin: 1rem 0;
    line-height: 1.1;
    max-width: 60ch;
  }

  p:last-child {
    margin-bottom: 0;
  }

  .letter {
    display: inline-block;
    padding: .75rem;
    border-radius: var(--border-radius);
    margin-right: .75rem;
    font-weight: bold;

    &.in-solution {
      background: var(--lightblue);
    }

    &.not-in-solution {
      background: var(--red);
    }
  }
</style>