import { Criteria } from './schema'
import { Schema } from './validius'

export * from './builders'
export * from './error'
export * from './validius'

export const schema = (criteria: Criteria) => {
    return new Schema(criteria)
}