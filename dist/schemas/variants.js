"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const variantSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(50),
    addition_cost: zod_1.z.number().min(1),
    stock_count: zod_1.z.number().min(1),
});
exports.default = { variantSchema };
