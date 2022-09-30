export type Schema = { [key: string]: Validation | Schema }

export type Validation = {
    required?: boolean
    type?: Type
    min?: number
    max?: number
    default?: any
}

export enum Type {
    Number,
    String,
    Object,
    Array,
}

export const Number = Type.Number

export const String = Type.String

export const Array = Type.Array

export const Object = Type.Object