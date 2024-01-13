"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(50),
    description: zod_1.z.string().min(1).max(1000),
    price: zod_1.z.number().min(1)
});
exports.default = { productSchema: exports.productSchema };
