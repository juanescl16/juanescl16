import { DateTime } from 'luxon'
export const datetime = (val: string): string => {
    const date = DateTime.fromISO(val)
    return date.toFormat('dd/MM/yyyy hh:mm:ssa')
}
export const date = (val: string): string => {
    return new Date(val).toLocaleDateString()
}
