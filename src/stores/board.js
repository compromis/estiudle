import { defineStore } from 'pinia'
import { currentDate, currentDay } from '@/utils/date.js'
import phrases from '@/content/phrases.js'

export const useBoardStore = defineStore('board', {
  state () {
    return {
      letters: [],
      panel: [],
      maxLetters: 5,
      solving: false,
      failed: false,
      solved: false,
      specialChars: [' ', '\t', '\'', ',', '\n'],
      lastPlayed: 0
    }
  },

  actions: {
    startGame () {
      this.lastPlayed = currentDate()
      if (this.panel.length === 0) {
        this.solution.forEach((letter) => {
          const char = this.specialChars.includes(letter) ? letter : ''
          this.panel.push(char)
        })
      }
    },

    enterLetter (letter) {
      this.letters.push(letter)
      this.addLetterToPanel(letter)
    },

    addLetterToPanel (letter) {
      this.solution.forEach((l, i) => {
        if (l === letter) {
          this.panel[i] = letter
        }
      })
    },

    enterSolution (letter) {
      this.panel[this.firstAvailableSlotInSolution] = letter
    },

    backspace () {
      const slot = this.firstAvailableSlotInSolution

      if (slot === -1) {
        this.panel[this.panel.length - 1] = ''
        return
      }

      const toDelete = this.panel[slot - 1]
      if (!this.specialChars.includes(toDelete)) {
        this.panel[slot - 1] = ''
      } else {
        this.panel[slot - 2] = ''
      }
    },

    enterSolveMode () {
      this.solving = true
    },

    solve () {
      const phrase = this.panel.join('')
      if (phrase === this.today.phrase) {
        this.solved = true
      } else {
        this.failed = true
      }
    }
  },

  getters: {
    today () {
      const testing = window.location.hash.replaceAll('#','')
      const day = currentDay()
      return testing ? phrases[testing] : phrases[day]
    },

    solution () {
      return this.today.phrase.split('')
    },

    clue () {
      return this.today.clue
    },

    lettersWithState ({ letters }) {
      return letters.map(letter => {
        const state = this.today.phrase.includes(letter)
        return { letter, state }
      })
    },

    firstAvailableSlotInSolution () {
      return this.panel.findIndex((slot) => slot === '')
    },

    mustSolve ({ letters, maxLetters }) {
      return letters.length >= maxLetters
    },

    keysDisabled ({ solving, failed }) {
      return (this.mustSolve && !solving) || failed || this.solved
    },

    finished () {
      return this.solved || this.failed
    }
  },

  persist: {
    afterRestore (context) {
      // Reset store every day or if testing
      const today = currentDate()
      const testing = window.location.hash

      if (today > context.store.lastPlayed || testing) {
        context.store.$patch({ letters: [], panel: [], solving: false, solved: false, failed: false })
      }
    }
  },
})
