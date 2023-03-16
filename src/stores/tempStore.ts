import { defineStore } from 'pinia'
import { TempState } from '@/interfaces/interfaces'

const useTempStore = defineStore('tempState', {
    state: (): TempState => ({
        newsletter: null,
    }),
    persist: true,
})

export { useTempStore }
