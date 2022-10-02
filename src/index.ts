import { Criteria } from './schema'
import { Schema } from './validius'

export * from './builders'
export * from './error'

export const schema = (criteria: Criteria) => {
    return new Schema(criteria)
}