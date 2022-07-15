import { defineStore } from 'pinia'
import phrases from '@/content/phrases.js'

export const useBoardStore = defineStore('board', {
  state: () => {
    return {
      phrases,
      letters: [],
      solution: [] 
    }
  },

  actions: {
    enterLetter (letter) {
      this.letters.push(letter)
    },
  },

  getters: {
    todaysPhrase ({ phrases }) {
      const date = new Date()
      const day = date.getDate()
      // return phrases[day - 1]
      return phrases[0]
    },

    todaysClue () {
      return this.todaysPhrase.clue
    }
  }
})
