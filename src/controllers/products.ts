import { Request, Response } from "express";
import db from "../configs/db";
import { productSchema } from "../schemas/products";

/*
response status codes
409 - conflict
404 - not found
400 - bad request
201 - created resource
200 - successful
*/

export async function getAll(request: Request, response: Response) {
    try {

        const products = await db.product.findMany({
            include: { variants: true }
        });
        return response.status(200).json(products);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "internal server error" });
    }
}




export async function get(request: Request, response: Response) {
    try {

        const product = await db.product.findUnique({
            where: { id: request.params.pid },
            include: { variants: true }
        });

        if (!product) {
            return response.status(404).json({ error: 'product not found' });
        }

        return response.status(200).json(product)

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "internal server error" });
    }

}




export async function create(request: Request, response: Response) {
    try {

        const validation = productSchema.safeParse(request.body);

        if (!validation.success) {
            return response.status(400).json(validation.error.errors)
        }

        const existingProduct = await db.product.findUnique({
            where: { name: request.body.name }
        });

        if (existingProduct) {
            return response.status(409).json({ error: 'product is already exist with same name' });
        }

        const product = await db.product.create({
            data: {
                name: request.body.name,
                description: request.body.description,
                price: request.body.price
            }
        });

        return response.status(201).json(product);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "internal server error" });
    }

}


export async function update(request: Request, response: Response) {
    try {

        const validation = productSchema.safeParse(request.body);

        if (!validation.success) {
            return response.status(400).json(validation.error.errors);
        }

        const product = await db.product.findUnique({
            where: { id: request.params.pid }
        });

        if (!product) {
            return response.status(404).json({ error: "product not found" });
        }

        const duplicateProduct = await db.product.findFirst({
            where: { name: request.body.name }
        });

        if (duplicateProduct && duplicateProduct.id !== product.id) {
            return response.status(409).json({ error: "product is already exists with same name" });
        }

        const updatedProduct = await db.product.update({
            where: { id: request.params.pid },
            data: {
                name: request.body.name,
                description: request.body.description,
                price: request.body.price
            },
            include: { variants: true }
        });

        return response.status(200).json(updatedProduct);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "internal server error" });
    }
}


export async function remove(request: Request, response: Response) {
    try {

        const product = await db.product.findUnique({
            where: { id: request.params.pid }
        });

        if (!product) {
            return response.status(404).json({ error: "product not found" });
        }

        await db.product.delete({
            where: { id: request.params.pid },
            include: { variants: true }
        });

        return response.status(204).json({});

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "internal server error" });
    }

}


export async function search(request: Request, response: Response) {
    try {
        const query = request.query.q as string;


        if (!query) {
            return response.status(400).json({ error: "query string required" });
        }

        const products = await db.product.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                    { variants: { some: { name: { contains: query, mode: 'insensitive' } } } }
                ]
            },
            include: { variants: true }
        });

        return response.status(200).json(products);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "internal server error" });
    }

}



export default { create, getAll, get, update, remove, search }
