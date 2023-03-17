import { useVecindappApiClient } from './../apiClients/vecindappApiClient'
import { State } from '../interfaces/interfaces'
import { defineStore } from 'pinia'

const useStore = defineStore('main', {
    state: (): State => ({
        user: null,
        venue: null,
        people: null,
        profile: null,
        person: null,
    }),
    getters: {
        capabilities: (state) => state.person?.capabilities ?? [],
    },
    persist: true,
})

export { useStore }
