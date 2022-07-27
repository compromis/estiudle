<script setup>
import AppNav from '@/components/AppNav.vue'
import Clue from '@/components/Clue.vue'
import PhraseBoard from '@/components/PhraseBoard.vue'
import LetterBoard from '@/components/LetterBoard.vue'
import Keyboard from '@/components/Keyboard.vue'
import Tester from '@/components/Tester.vue'
import Results from './components/Results.vue'
import Stats from './components/Stats.vue'
import Instructions from './components/Instructions.vue'
</script>

<template>
  <div class="main-container">
    <div class="main-container-aligner">
      <AppNav />
      <div class="panel-wrapper">
        <PhraseBoard />
        <Clue />
        <LetterBoard />
      </div>
      <Keyboard />
      <Results />
    </div>
  </div>
  <Tester />
  <Stats />
  <Instructions />
</template>

<style scoped lang="scss">
.main-container {
  display: flex;
  min-height: calc(var(--vh) * 100);
  width: 100%;

  &-aligner {
    display: grid;
    grid-template-rows: auto 1fr auto;
    margin: 0 auto;
    max-width: var(--view-max-width);
    padding: var(--view-padding);
    gap: .75rem;
    width: 100%;
  }
}

.panel-wrapper {
  display: grid;
  gap: .75rem;
  grid-template-rows: auto 1fr auto;
}

.letter-board {
  align-self: end;
} 
</style>
