import { 
    ObjectCriteria, 
    Criteria, 
    Type, 
    StringCriteria, 
    NumberCriteria, 
    BooleanCriteria, 
    ArrayCriteria 
} from "./schema"

export function object(schema: ObjectCriteria) : Criteria {
    return {
        type: Type.Object,
        schema: schema
    }
}

export function string(schema: StringCriteria): Criteria {
    return {
        type: Type.String,
        schema: schema
    }
}

export function number(schema: NumberCriteria): Criteria {
    return {
        type: Type.Number,
        schema: schema
    }
}

export function boolean(schema: BooleanCriteria): Criteria {
    return {
        type: Type.Boolean,
        schema: schema
    }
}


export function array(schema: ArrayCriteria) : Criteria {
    return {
        type: Type.Array,
        schema: schema
    }
}