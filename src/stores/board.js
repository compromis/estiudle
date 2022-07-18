import { defineStore } from 'pinia'
import phrases from '@/content/phrases.js'

export const useBoardStore = defineStore('board', {
  state () {
    return {
      phrases,
      letters: [],
      solution: [],
      maxLetters: 6,
      solving: false,
      failed: false,
      specialChars: [' ', '\t', '\'']
    }
  },

  actions: {
    enterLetter (letter) {
      this.letters.push(letter)
    },

    enterSolution (letter) {
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
    todaysPhrase ({ phrases }) {
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
  }
})
