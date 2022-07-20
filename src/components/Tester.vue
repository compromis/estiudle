<script setup>
import phrases from '@/content/phrases.js'
import { onMounted, ref } from 'vue'
const testing = window.location.hash

const phraseId = ref(0)
const showTester = ref(false)
onMounted(() => {
  showTester.value = !!testing
  phraseId.value = testing.replaceAll('#', '')
})

const setPhrase = (e) => {
  window.location = '#' + e.target.value
  window.location.reload()
}
</script>

<template>
  <div v-if="showTester">
    Tester:
    <select @change="setPhrase">
      <option v-for="(phrase, i) in phrases" :key="phrase.phrase" :value="i" :selected="phraseId == i">
        {{ i+1 }} agost
      </option>
    </select>
  </div>
</template>