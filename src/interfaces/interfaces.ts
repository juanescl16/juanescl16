export interface State {
    user: User | null
    venue: Venue | null
    people: Person[] | null
    profile: Profile | null
    person: Person | null
}

export interface TempState {
    newsletter: Newsletter | null
    petition: Petition | null
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
    capabilities?: string[]
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
    files: NewsletterFile[]
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

export interface Facility {
    id: number
    name: string
    slug: string
    for_rent: boolean
    rent_value?: number
    deposit?: number
    out_of_service?: boolean
    reserve_days_until?: number
    maximun_capacity: number
    simultaneous_reservations: number
    reservation_strip: number
    start_date?: Date
    end_date?: Date
    restrict_defaulters: boolean
    description: string
}

export interface PetitionType {
    id: number
    name: string
    slug?: string
    description?: string
}

export interface PetitionTopic {
    id: number
    name: string
    slug?: string
    petition_type_id?: number
}

export interface PetitionStatus {
    id: number
    name: string
    slug?: string
    description?: string
}

export interface Petition {
    id: number
    person_id: number
    name: string
    description: string
    satisfied?: string
    code?: string
    created_at?: Date
    updated_at?: Date
    files: PetitionFile[]
    petition_type: PetitionType
    petition_topic: PetitionTopic
    petition_status: PetitionStatus
    comments: PetitionComment[]
}

export interface PetitionFile {
    id: number
    url: string
    name: string
    comment?: string
}

export interface PetitionComment {
    id: number
    person: string
    status: string
    comment?: string
    created_at?: Date
}

export interface ResultBag<T> {
    status: boolean
    msg: string
    result: T
    info: any
    trace: any
}
