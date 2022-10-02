import { number, object, schema, string } from "../src";

const objectSchema = schema(
    object({
        required: true,
        entries: {
            name: string({
                required: true,
                min: 6
            }),
            surname: string({
                required: true,
                max: 16
            }),
            signature: string({
                required: true,
                match: ["first", "second"]
            })
        }
    })
)

const result = objectSchema.validate({
    name: 'as',
    signature: "ddd"
})

console.log(result.all());
