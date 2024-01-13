import { Request, Response } from "express";
import db from "../configs/db";
import schema from "../schemas/variants";

export async function getAll(request: Request, response: Response) {
    try {

        const { pid } = request.params;

        const product = await db.product.findUnique({
            where: { id: pid }
        });

        if (!product) {
            return response.status(404).json({ error: "product not found." });
        }

        const variants = await db.variant.findMany({
            where: { productId: pid }
        });

        return response.status(200).json(variants);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "internal server error" });
    }
}


export async function get(request: Request, response: Response) {
    try {

        const { pid, vid } = request.params;

        const product = await db.product.findUnique({
            where: { id: pid },
            include: { variants: true }
        });

        if (!product) {
            return response.status(404).json({ error: "product not found" });
        }

        const variant = product.variants.find((variant) => variant.id === vid);

        if (!variant) {
            return response.status(404).json({ error: "variant not found" });
        }

        return response.status(200).json(variant);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "internal server error" });
    }
}


export async function create(request: Request, response: Response) {
    try {

        const { pid } = request.params;
        const validation = schema.variantSchema.safeParse(request.body);

        if (!validation.success) {
            return response.status(400).json(validation.error.errors);
        }

        const product = await db.product.findUnique({
            where: { id: pid },
            include: { variants: true }
        });

        if (!product) {
            return response.status(404).json({ error: "product not found" });
        }

        const match = product.variants.find((variant) => variant.name === request.body.name);

        if (match) {
            return response.status(409).json({error: "variant is already exists in this product"});
        }

        const variant = await db.variant.create({
            data: {
                name: request.body.name,
                addition_cost: request.body.addition_cost,
                stock_count: request.body.stock_count,
                productId: product.id
            }
        });

        return response.status(201).json(variant);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "internal server error" });
    }
}


export async function update(request: Request, response: Response) {
    try {

        const { pid, vid } = request.params;
        const validation = schema.variantSchema.safeParse(request.body);

        if (!validation.success) {
            return response.status(400).json(validation.error.errors);
        }

        const product = await db.product.findUnique({
            where: { id: pid },
            include: {variants: true}
        });

        if (!product) {
            return response.status(404).json({ error: "product not found" });
        }

        const variant = await db.variant.findUnique({
            where: { id: vid }
        });

        if (!variant) {
            return response.status(404).json({ error: "variant not found" })
        }

        if (variant.productId !== product.id) {
            return response.status(400).json({ error: "variant id and product id mismatch" });
        }

        const match = product.variants.find((variant) => variant.name === request.body.name);

        if (match && match.id !== variant.id) {
            return response.status(409).json({error: "variant is already exists in this product"});
        }

        const updatedvariant = await db.variant.update({
            where: { id: vid },
            data: {
                name: request.body.name,
                addition_cost: request.body.addition_cost,
                stock_count: request.body.stock_count
            }
        });

        return response.status(200).json(updatedvariant);


    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "internal server error" });
    }
}

export async function remove(request: Request, response: Response) {
    try {

        const { pid, vid } = request.params;

        const product = await db.product.findUnique({
            where: { id: pid }
        });

        if (!product) {
            return response.status(404).json({ error: "product not found" });
        }

        const variant = await db.variant.findUnique({
            where: { id: vid }
        });

        if (!variant) {
            return response.status(404).json({ error: "variant not found" })
        }

        if (variant.productId !== product.id) {
            return response.status(400).json({ error: "variant id and product id mismatch" });
        }

        await db.variant.delete({
            where: { id: variant.id }
        });

        return response.status(204).json({});

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "internal server error" });
    }
}


export default { getAll, get, create, update, remove };