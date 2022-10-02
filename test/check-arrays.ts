import { array, number, object, schema, string } from "../src";

const arraySchema = schema(
    array({
        template: number({
            required: true,
            match: [1, 2, 3],
        }),
        length: 4
    })
)

const result = arraySchema.validate([1, 1, 1, 2, 3])

console.log(result.all());
