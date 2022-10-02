"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const arraySchema = (0, src_1.schema)((0, src_1.array)({
    template: (0, src_1.number)({
        required: true,
        match: [1, 2, 3],
    }),
    length: 4
}));
const result = arraySchema.validate([1, 1, 1, 2, 3]);
console.log(result.all());
