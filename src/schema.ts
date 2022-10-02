export type Criteria = {
    type: Type,
    schema: NumberCriteria | StringCriteria | BooleanCriteria | ObjectCriteria | ArrayCriteria
}

export enum Type {
    Number,
    Boolean,
    String,
    Object,
    Array
}

export type BaseCriteria = {
    required?: boolean,
    match?: any[]
}

export type ObjectCriteria = {
    entries?: {
        [key: string] : Criteria
    }
} & BaseCriteria

export type ArrayCriteria = {
    isEmpty?: boolean
    length?: number
    min?: number
    max?: number
    value?: any[]
    template?: Criteria 
} & BaseCriteria

export type StringCriteria = {
    min?: number
    max?: number
    value?: string
    isEmail?: boolean
} & BaseCriteria

export type NumberCriteria = {
    min?: number
    max?: number
    value?: number
} & BaseCriteria

export type BooleanCriteria = {
    value?: boolean
} & BaseCriteria
