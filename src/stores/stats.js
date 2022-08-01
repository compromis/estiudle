import { defineStore } from 'pinia'
import { currentDate } from '@/utils/date.js'
import phrases from '@/content/phrases.js'

export const useStatsStore = defineStore('stats', {
  state () {
    return {
      stats: {
        played: 0,
        won: 0,
        failed: 0,
        currentStreak: 0,
        maxStreak: 0,
        letters: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        winPercentage: 0
      },
      lastPlayed: 0,
      statsOpen: false,
      instructionsOpen: false
    }
  },

  actions: {
    registerStats ({ letters, failed }) {
      this.lastPlayed = currentDate
      this.stats.played++
      this.stats.letters[letters.length]++

      if (failed) {
        this.stats.failed++
        this.stats.currentStreak = 0
      } else {
        this.stats.won++
        this.stats.currentStreak++
      }

      if (this.stats.currentStreak > this.stats.maxStreak) {
        this.stats.maxStreak = this.stats.currentStreak
      }

      this.stats.winPercentage = this.stats.won * 100 / this.stats.played

      gtag('event', 'game_finished', {
        'letters': letters.length,
        'result': failed ? 'failed' : 'solved'
      })
    },

    toggleStats () {
      this.statsOpen = !this.statsOpen
    },

    toggleInstructions () {
      this.instructionsOpen = !this.instructionsOpen
    }
  },

  persist: {
    afterRestore (context) {
      // Reset store every day or if testing
      const today = currentDate()
      const testing = window.location.hash

      if (today > context.store.lastPlayed || testing) {
        context.store.$patch({ statsOpen: false, instructionsOpen: false })
      }
    }
  },
})
