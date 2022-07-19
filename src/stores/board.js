import { defineStore } from 'pinia'
import phrases from '@/content/phrases.js'

export const useBoardStore = defineStore('board', {
  state () {
    return {
      letters: [],
      solution: [],
      maxLetters: 5,
      solving: false,
      failed: false,
      specialChars: [' ', '\t', '\'', ',', '\n'],
      lastPlayed: 0
    }
  },

  actions: {
    startGame () {
      const date = new Date()
      const currentDate = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
      this.lastPlayed = currentDate
    },

    enterLetter (letter) {
      // Only 1 vowel is allowed
      this.letters.push(letter)
    },

    enterSolution (letter) {
      // If a user enters a wrong letter
      // it's game over
      if (this.todaysPhrase.phrase.includes(letter)) {
        this.solution.push(letter)
      } else {
        this.failed = true
      }
    },

    solve () {
      this.solving = true
    }
  },

  getters: {
    todaysPhrase () {
      const date = new Date()
      const day = date.getDate()
      // return phrases[day - 1]
      return phrases[0]
    },

    todaysClue () {
      return this.todaysPhrase.clue
    },

    allLetters ({ letters, solution }) {
      return [...letters, ...solution]
    },

    lettersWithState ({ letters }) {
      return letters.map(letter => {
        const state = this.todaysPhrase.phrase.includes(letter)
        return { letter, state }
      })
    },

    mustSolve ({ letters, maxLetters }) {
      return letters.length >= maxLetters
    },

    keysDisabled ({ solving, failed }) {
      return (this.mustSolve && !solving) || failed || this.solved
    },

    solved () {
      const phrase = this.todaysPhrase.phrase.split('')
      return phrase.every(letter => (
        this.allLetters.includes(letter) || this.specialChars.includes(letter)
      ))
    },

    finished () {
      return this.solved || this.failed
    }
  },

  persist: {
    afterRestore (context) {
      // Reset store every day
      const date = new Date()
      const currentDate = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`

      if (currentDate > context.store.lastPlayed) {
        context.store.$patch({ letters: [], solution: [], solving: false, failed: false })
      }
    }
  },
})
