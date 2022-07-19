import { defineStore } from 'pinia'
import phrases from '@/content/phrases.js'

export const useStatsStore = defineStore('stats', {
  state () {
    return {
      stats: {
        played: 0,
        won: 0,
        failed: 0,
        currentStreal: 0,
        maxStreak: 0,
        letters: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        winPercentage: 0
      },
      lastPlayed: 0,
      modalOpen: false
    }
  },

  actions: {
    registerStats ({ letters, failed }) {
      const date = new Date()
      const currentDate = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
      if (this.lastPlayed == currentDate) return

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
    },

    openModal () {
      this.modalOpen = true
    },

    closeModal () {
      this.modalOpen = false
    }
  },

  persist: true,
})
