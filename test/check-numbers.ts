import { number, schema } from "../src";

const numberSchema = schema(
    number({
        required: true,
        value: 6
    })
)

const result = numberSchema.validate('a6')

console.log(result.all());