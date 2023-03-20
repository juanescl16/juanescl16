import { DateTime } from 'luxon'
export const datetime = (val: string): string => {
    const date = DateTime.fromISO(val)
    return date.toFormat('dd/MM/yyyy hh:mm:ssa')
}
export const date = (val: string): string => {
    return new Date(val).toLocaleDateString()
}

export const replaceURLWithHTML = (text: string) => {
    const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi
    return text.replace(exp, '<a href="$1" target="_blank">$1</a>')
}

export const round = (val: number, positions = 2): string => {
    return val.toFixed(positions)
}
