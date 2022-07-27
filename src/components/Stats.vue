<script setup>
import { storeToRefs } from 'pinia'
import { useStatsStore } from '@/stores/stats.js'
import Modal from './Modal.vue'
import { computed } from 'vue'
import NextEstiudle from './NextEstiudle.vue';

const stats = useStatsStore()
const { stats: gameStats, statsOpen } = storeToRefs(stats)

const maxValue = computed(() => Math.max(...Object.values(stats.stats.letters)))

const barLength = (value) => maxValue.value === 0 ? 0 : value / maxValue.value * 100

</script>

<template>
  <Modal id="Stats" title="Estadístiques" v-model="statsOpen">
    <div class="stats-grid">
      <div class="stat">
        <div class="stat-number">{{gameStats.won}}/{{gameStats.played}}</div>
        <div class="stat-name">Panells resolts</div>
      </div>
      <div class="stat">
        <div class="stat-number">{{gameStats.currentStreak}}</div>
        <div class="stat-name">Ratxa</div>
      </div>
      <div class="stat">
        <div class="stat-number">{{gameStats.maxStreak}}</div>
        <div class="stat-name">Ratxa màxima</div>
      </div>
    </div>
    <h3 style="text-align: left; margin-bottom: .5rem;">Lletres comprades</h3>
    <ul class="stats-graph">
      <li v-for="(letter, number) in gameStats.letters" :key="letter">
        <span class="graph-number">{{number}}</span>
        <span class="graph-bar" :style="`width: ${barLength(letter)}%`">{{letter}}</span>
      </li>
    </ul>
    <div class="next-estiudle">
      <NextEstiudle />
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.stats {
  margin: 0 auto;
  max-width: 900px;
  padding: var(--view-padding);

  &-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    .stat {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      text-align: left;

      &-number {
        font-size: var(--font-size-lg);
        line-height: 1.2;
      }

      &-name {
        font-size: var(--font-size-sm);
        line-height: 1.1;
      }
    }
  }
}

.stats-graph {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: grid;
    grid-template-columns: var(--font-size-md) 1fr;
    align-items: center;
    text-align: left;
    margin-top: .5rem;
  }

  .graph-bar {
    box-sizing: border-box;
    border-radius: var(--border-radius);
    background: var(--lightblue);
    padding: .25rem .5rem;
    min-width: var(--font-size-md);
  }
}

.next-estiudle {
  text-align: center;
  margin-top: 2rem;
}
</style>