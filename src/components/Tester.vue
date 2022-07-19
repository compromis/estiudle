<script setup>
import phrases from '@/content/phrases.js'
import { onMounted, ref } from 'vue'
const testing = window.location.hash

const showTester = ref(false)
onMounted(() => {
  showTester.value = !!testing
})
</script>

<template>
  <div v-if="showTester">
    Tester
  </div>
</template>