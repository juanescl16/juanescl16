import { useStore } from '@/stores/mainStore'

const store = useStore()

export const userCan = (capability: string): boolean => store.capabilities.includes(capability)
