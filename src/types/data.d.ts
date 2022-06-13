export interface Specie {
    name: string,
    gender: string,
    phylum: string,
    order: string,
    family: string,
    subfamily: string,
    location: string,
    distribution: string,
    feeding: string,
    picture?: string,
    id?: string
}

export interface UpdateSpecie {
    name?: string,
    gender?: string,
    phylum?: string,
    order?: string,
    family?: string,
    subfamily?: string,
    location?: string,
    distribution?: string,
    feeding?: string,
    picture?: string,
    id?: string
}