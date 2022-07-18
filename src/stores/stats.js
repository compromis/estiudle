import { defineStore } from 'pinia'
import phrases from '@/content/phrases.js'

export const useStatsStore = defineStore('stats', {
  state () {
    return {
      stats: [],
      modalOpen: false
    }
  },

  actions: {
    registerStats ({ phrase, letters, solution, failed }) {
      
    },

    openModal () {
      this.modalOpen = true
    },

    closeModal () {
      this.modalOpen = false
    }
  }
})
