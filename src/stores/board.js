import { defineStore } from 'pinia'
import { useStatsStore } from '@/stores/stats.js'
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
      specialChars: [' ', '\t', '\'', '’', '·', ',', '\n'],
      letterMarks: {
        'A': ['À'],
        'E': ['È', 'É'],
        'I': ['Í', 'Ï'],
        'O': ['Ò', 'Ó'],
        'U': ['Ú', 'Ü']
      },
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
        if (l === letter || (letter in this.letterMarks && this.letterMarks[letter].includes(l))) {
          this.panel[i] = l
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
      const panel = this.removeLetterMarks(this.panel.join(''))
      const solution = this.removeLetterMarks(this.today.phrase)
  
      if (panel === solution) {
        this.solved = true
      } else {
        this.failed = true
      }

      const stats = useStatsStore()
      stats.registerStats({ letters: this.letters, failed: this.failed })
    },

    removeLetterMarks (value) {
      if (value === 'ç' || value === 'Ç') return value
      return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
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

    lettersWithState({ letters, today }) {
      return letters.map(letter => {
        const state = this.removeLetterMarks(today.phrase).includes(letter) ? 'in-solution' : 'not-in-solution'
        return { letter, state }
      })
    },

    letterBoard ({ lettersWithState, maxLetters, today }) {
      return [...new Array(maxLetters)].map((letter, i) => {
        if (lettersWithState[i]) {
          return { letter: lettersWithState[i].letter, state: lettersWithState[i].state }
        } else {
          return { letter: '', state: 'empty' }
        }
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
