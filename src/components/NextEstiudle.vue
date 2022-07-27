<script setup>
import { computed } from 'vue'
import VueCountdown from '@chenfengyuan/vue-countdown'

const timeTillMidnight = computed(() => {
  const now = new Date()
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  return (midnight - now)
})

const transformSlotProps = (props) => {
  const formattedProps = {};

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value);
  });

  return formattedProps;
}
</script>

<template>
  <p>Proper Estiudle</p>
  <VueCountdown :time="timeTillMidnight" :transform="transformSlotProps" v-slot="{ hours, minutes, seconds }" class="countdown">
    {{ hours }}:{{ minutes }}:{{ seconds }}
  </VueCountdown>
</template>

<style lang="scss" scoped>
p {
  font-size: var(--font-size-sm);
  margin: 0;
  line-height: 1;
}

.countdown {
  font-size: var(--font-size-md);
  font-variant-numeric: tabular-nums;
}
</style>