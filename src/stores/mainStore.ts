import { State } from '../interfaces/interfaces'
import { defineStore } from 'pinia'

const useStore = defineStore('main', {
    state: (): State => ({
        user: null,
        venue: null,
        people: null,
        profile: null,
    }),
    persist: true,
})

export { useStore }
