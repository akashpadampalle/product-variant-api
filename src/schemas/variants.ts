import { z } from "zod";

const variantSchema = z.object({
    name: z.string().min(1).max(50),
    addition_cost: z.number().min(1),
    stock_count: z.number().min(1),
});

export default { variantSchema };