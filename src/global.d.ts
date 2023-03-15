export interface AxiosResponse {
    data: any
    status: string
    statusText: string
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $filters: Record<string, any>
    }
}

export {}
