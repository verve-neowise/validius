import { Validation } from "./schema"

enum SchemaType {
    Number,
    Boolean,
    String,
    Object,
    Array,
    Value
}

type BaseSchema = {
    required?: boolean
}

type ObjectSchema = {
    entries?: {
        [key: string] : Schema
    }
} & BaseSchema

type ArraySchema = {
} & BaseSchema

type ValueSchema = {
    min?: number
    max?: number
    value?: any
} & BaseSchema

export function object(schema: ObjectSchema) : Schema {
    return {
        type: SchemaType.Object,
        schema: schema
    }
}

export function string(schema: ValueSchema): Schema {
    return {
        type: SchemaType.String,
        schema: schema
    }
}

export function number(schema: ValueSchema): Schema {
    return {
        type: SchemaType.Number,
        schema: schema
    }
}

export function boolean(schema: ValueSchema): Schema {
    return {
        type: SchemaType.Boolean,
        schema: schema
    }
}


export function array(schema: ArraySchema) : Schema {
    return {
        type: SchemaType.Array,
        schema: schema
    }
}

type Schema = {
    type: SchemaType,
    schema: ValueSchema | ObjectSchema | ArraySchema
}

const valueSchemas = [SchemaType.Boolean, SchemaType.Number, SchemaType.String]

type ValidationError = { name: string, reason: string }

class Validius {

    private errors: ValidationError[] = []

    constructor(
        private schema: Schema
    ) {}

    check(data: any) {
        let { schema } = this.schema

        try {
            if (this.checkRequired("object", data)) {
                this.validateObject(undefined, data, schema) 
            }
            return this.errors
        }
        catch(error: any) {
            this.errors.push(error)
        }
    }

    private validate(name: string, data: any, schema: Schema) {

        if (!this.checkRequired(name, data)) {
            return
        }

        if (schema.type == SchemaType.Object) {
           return this.validateObject(name, data, schema.schema)
        }
        if (schema.type == SchemaType.Array) {
            return this.validateArray(name, data, schema.schema)
        }
        if (valueSchemas.includes(schema.type)) {
            return this.validateValue(name, data, schema.type, schema.schema)
        }
    }

    private validateObject(name: string | undefined, data: any, schema: ObjectSchema) {
        if (schema.entries) {
            for(let key in schema.entries) {
                this.validate(key, data[key], schema.entries[key])
            }
        }
    }

    private validateArray(name: string | undefined, data: any, schema: ArraySchema) {
    }

    
    private validateValue(name: string | undefined, data: any, type: SchemaType, schema: ValueSchema) {

        if (type == SchemaType.Number) {

            let prop = name ? name : "number" 

            if (typeof data != "number") {
                return this.errors.push({ name : prop, reason: "must be a number"})
            }
            
            if (schema.value && data != schema.value) {
                return this.errors.push({ name : prop, reason: "must be equal to " + schema.value})
            }
            
            if (schema.min && schema.max) {
                if (data < schema.min || data > schema.max) {
                    return this.errors.push({ name : prop, reason: `must be between of ${schema.min}..${schema.max}`})
                }
            }

            if (schema.min) {
                if (data < schema.min) {
                    return this.errors.push({ name : prop, reason: "must be largest of " + schema.min})
                }
            }

            if (schema.max) {
                if (data > schema.max) {
                    return this.errors.push({ name : prop, reason: "must be largest of " + schema.max})
                }
            }
        }
        else if (type == SchemaType.String) {
            let prop = name ? name : "string" 

            if (typeof data != "string") {
                return this.errors.push({ name : prop, reason: "must be a string"})
            }

            if (schema.value && data != schema.value) {
                return this.errors.push({ name : prop, reason: "must be equal to " + schema.value})
            }
        }
        else if (type == SchemaType.Boolean) {
            let prop = name ? name : "boolean" 

            if (typeof data != "boolean") {
                return this.errors.push({ name : prop, reason: "must be a boolean"})
            }
            
            if (schema.value && data != schema.value) {
                return this.errors.push({ name : prop, reason: "must be equal to " + schema.value})
            }
        }
    }

    private checkRequired(name: string | undefined, data: any): boolean {
        if (!data) {
            this.errors.push({ name : name ? name : "", reason: "is required" })
            return false
        }
        return true
    }
}

export function validate(schema: Schema) {
    return new Validius(schema)
}


object({
    required: true,
    entries: {
        name: string({
            required: true,
            value: "Hello App"
        }),
        loggedIn: boolean({
            required: true,
            value: false
        })
    }
})