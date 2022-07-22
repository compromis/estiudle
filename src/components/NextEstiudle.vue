<script setup>
import { computed } from 'vue'
import VueCountdown from '@chenfengyuan/vue-countdown'

const timeTillMidnight = computed(() => {
  const now = new Date()
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  return (midnight - now)
})
</script>

<template>
  <div>Proper estiudle</div>
  <VueCountdown :time="timeTillMidnight" v-slot="{ hours, minutes, seconds }">
    {{ hours }}:{{ minutes }}:{{ seconds }}
  </VueCountdown>
</template>

<style lang="scss" scoped>

</style>