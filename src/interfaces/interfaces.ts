export interface State {
    user: User | null
    venue: Venue | null
    people: Person[] | null
    profile: Profile | null
    person: Person | null
}

export interface Venue {
    id: number
    name: string
}
export interface Role {
    id: number
    name: string
    slug: string
}

export interface Structure {
    id: number
    name: string
    role: Role
}

export interface Person {
    id: number
    name: string
    document: string
    phone: string
    email: string
    structures?: Structure[]
    venue: Venue
}

export interface User {
    id: number
    name: string
    username: string
    api_token: string
    phone: string
    email: string
    photo_url: string
    profiles_count: number
    venues_count: number
}

export interface Venue {
    id: number
    name: string
}

export interface Profile {
    id: number
    name: string
    slug: string
}

export interface Newsletter {
    id: number
    title: string
    description: string
    created_at: Date
    files?: NewsletterFile[]
}

export interface NewsletterFile {
    id: number
    url: string
    name: string
}

export interface Paginated<T> {
    data: Array<T>
    meta: {
        current_page: number
        from: number
        last_page: number
        per_page: number
        to: number
        total: number
    }
}
