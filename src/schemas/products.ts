import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(1000),
    price: z.number().min(1)
});



export default { productSchema }