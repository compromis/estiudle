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
      // find last non-empty, non-special character and non-guessed letter in solution
      let lastIndex = -1
      this.panel.forEach((letter, i) => {
        if(!this.specialChars.includes(letter) && !this.letters.includes(letter) && letter !== '') {
          lastIndex = i
        }
      })

      if (lastIndex >= 0) {
        this.panel[lastIndex] = ''
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
