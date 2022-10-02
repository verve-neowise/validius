import { Errors } from "./error"
import {
    ArrayCriteria, 
    BaseCriteria, 
    BooleanCriteria, 
    Criteria, 
    NumberCriteria, 
    ObjectCriteria, 
    StringCriteria, 
    Type
} from './schema'
import { isEmail } from "./util"

type Strategy = (name: string, data: any, schema: BaseCriteria, errors: Errors) => void

const strategies = new Map<Type, Strategy>([
        [ Type.Object, object],
        [ Type.Array, array],
        [ Type.String, string],
        [ Type.Number, number],
        [ Type.Boolean, boolean],
])

export class Schema {

    constructor(private criteria: Criteria) {}

    validate(data: any): Errors {
        return check(data, this.criteria)
    }
}

function check(data: any, criteria: Criteria) {
    let errors = new Errors()

    validate("value", data, criteria, errors)

    return errors
}

function validate(name: string, data: any, criteria: Criteria, errors: Errors) {

    let { type, schema } = criteria

    if (schema.required && !data) {
        return errors.add(name, "is required")
    }

    if (schema.match && !schema.match.includes(data)) {
        return errors.add(name, 'must be match of ' + schema.match)
    }

    let strategy = strategies.get(type)
    if (strategy) {
        return strategy(name, data, schema, errors)
    }
    else {
        throw new Error(`strategy for type ${type} not implemented.`)
    }
}

function object(name: string, data: any, schema: ObjectCriteria, errors: Errors) {
    if (schema.entries) {
        for (let key in schema.entries) {
            validate(key, data[key], schema.entries[key], errors)
        }
    }
}

function array(name: string, data: any, criteria: ArrayCriteria, errors: Errors) {
    if (!Array.isArray(data)) {
        return errors.add(name, "must be an array")
    }

    if (criteria.min && criteria.max) {
        if (data.length < criteria.min || data.length > criteria.max) {
            return errors.add(name, `length must be between of ${criteria.min}..${criteria.max}`)
        }
    }

    if (criteria.min) {
        if (data.length < criteria.min) {
            return errors.add(name, "must be longer of " + criteria.min)
        }
    }

    if (criteria.max) {
        if (data.length > criteria.max) {
            return errors.add(name, "must be shorten of " + criteria.max)
        }
    }
    
    if (criteria.length) {
        if (data.length > criteria.length) {
            return errors.add(name, "length must be " + criteria.length)
        }
    }

    if (criteria.value && data != criteria.value) {
        return errors.add(name, "must be equal to " + criteria.value)
    }

    if (criteria.isEmpty && data.length != 0) {
        return errors.add(name, "must be empty")
    }

    if (criteria.template) {
        data.forEach((value) => {
            validate(name + " element", value, criteria.template!, errors)
        })
    }
}

function string(prop: string, data: any, criteria: StringCriteria, errors: Errors) {

    if (typeof data != "string") {
        return errors.add(prop, "must be a string")
    }
    if (criteria.min && criteria.max) {
        if (data.length < criteria.min || data.length > criteria.max) {
            return errors.add(prop, `length must be between of ${criteria.min}..${criteria.max}`)
        }
    }

    if (criteria.min) {
        if (data.length < criteria.min) {
            return errors.add(prop, "must be longer of " + criteria.min)
        }
    }

    if (criteria.max) {
        if (data.length > criteria.max) {
            return errors.add(prop, "must be shorten of " + criteria.max)
        }
    }

    if (criteria.value && data != criteria.value) {
        return errors.add(prop, "must be equal to " + criteria.value)
    }

    if (criteria.isEmail && !isEmail(data)) {
        return errors.add(prop, "must be an email")
    }
}

function boolean(prop: string, data: any, schema: BooleanCriteria, errors: Errors) {
    if (typeof data != "boolean") {
        return errors.add(prop, "must be a boolean")
    }

    if (schema.value && data != schema.value) {
        return errors.add(prop, "must be equal to " + schema.value)
    }
}

function number(prop: string, data: any, criteria: NumberCriteria, errors: Errors) {

    if (isNaN(data)) {
        return errors.add(prop, "must be a number")
    }

    let value = Number(data)

    if (criteria.value && value != criteria.value) {
        return errors.add(prop, "must be equal to " + criteria.value)
    }

    if (criteria.min && criteria.max) {
        if (value < criteria.min || value > criteria.max) {
            return errors.add(prop, `must be between of ${criteria.min}..${criteria.max}`)
        }
    }

    if (criteria.min) {
        if (value < criteria.min) {
            return errors.add(prop, "must be largest of " + criteria.min)
        }
    }

    if (criteria.max) {
        if (value > criteria.max) {
            return errors.add(prop, "must be largest of " + criteria.max)
        }
    }
}