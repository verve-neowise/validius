import { number, object, string, validate } from "./validius";

const schema = validate(
    object({
        required: true,
        entries: {
            name: string({
                required: true
            }),
            surname: string({
                required: true,
                value: "Hello"
            }),
            age: number({
                required: true,
                min: 5,
                max: 16
            })
        }
    })
)

let testObject = {
    surname: "Hello",
    age: 3
}

let errors = schema.check(testObject)

console.log(errors);
