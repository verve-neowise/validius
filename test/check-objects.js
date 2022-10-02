"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const objectSchema = (0, src_1.schema)((0, src_1.object)({
    required: true,
    entries: {
        name: (0, src_1.string)({
            required: true,
            min: 6
        }),
        surname: (0, src_1.string)({
            required: true,
            max: 16
        }),
        signature: (0, src_1.string)({
            required: true,
            match: ["first", "second"]
        })
    }
}));
const result = objectSchema.validate({
    name: 'as',
    signature: "ddd"
});
console.log(result.all());
