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
    <AppNav />
    <PhraseBoard />
    <Clue />
    <LetterBoard />
    <Keyboard />
    <Results />
  </div>
  <Tester />
</template>

<style scoped>
.main-container {
  padding-top: calc(var(--font-size-lg + 2rem));
  margin: auto;
  max-width: 900px;
  padding: 0 .25rem;
}
</style>
