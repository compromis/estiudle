<script setup>
import AppNav from '@/components/AppNav.vue'
import Clue from '@/components/Clue.vue'
import PhraseBoard from '@/components/PhraseBoard.vue'
import LetterBoard from '@/components/LetterBoard.vue'
import Keyboard from '@/components/Keyboard.vue'
import Tester from '@/components/Tester.vue'
import Results from './components/Results.vue'
</script>

<template>
  <div class="main-container">
    <div class="main-container-aligner">
      <AppNav />
      <PhraseBoard />
      <Clue />
      <LetterBoard />
      <Keyboard />
      <Results />
    </div>
  </div>
  <Tester />
</template>

<style scoped lang="scss">
.main-container {
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  

  &-aligner {
    display: grid;
    grid-template-rows: auto 1fr auto auto auto;
    margin: 0 auto;
    max-width: 900px;
    padding: .5rem .25rem;
  }
}
</style>
