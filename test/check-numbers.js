"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const numberSchema = (0, src_1.schema)((0, src_1.number)({
    required: true,
    value: 6
}));
const result = numberSchema.validate('a6');
console.log(result.all());
