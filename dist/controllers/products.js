"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.remove = exports.update = exports.create = exports.get = exports.getAll = void 0;
const db_1 = __importDefault(require("../configs/db"));
const products_1 = require("../schemas/products");
/*
response status codes
409 - conflict
404 - not found
400 - bad request
201 - created resource
200 - successful
*/
function getAll(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield db_1.default.product.findMany({
                include: { variants: true }
            });
            return response.status(200).json(products);
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ error: "internal server error" });
        }
    });
}
exports.getAll = getAll;
function get(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield db_1.default.product.findUnique({
                where: { id: request.params.pid },
                include: { variants: true }
            });
            if (!product) {
                return response.status(404).json({ error: 'product not found' });
            }
            return response.status(200).json(product);
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ error: "internal server error" });
        }
    });
}
exports.get = get;
function create(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validation = products_1.productSchema.safeParse(request.body);
            if (!validation.success) {
                return response.status(400).json(validation.error.errors);
            }
            const existingProduct = yield db_1.default.product.findUnique({
                where: { name: request.body.name }
            });
            if (existingProduct) {
                return response.status(409).json({ error: 'product is already exist with same name' });
            }
            const product = yield db_1.default.product.create({
                data: {
                    name: request.body.name,
                    description: request.body.description,
                    price: request.body.price
                }
            });
            return response.status(201).json(product);
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ error: "internal server error" });
        }
    });
}
exports.create = create;
function update(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validation = products_1.productSchema.safeParse(request.body);
            if (!validation.success) {
                return response.status(400).json(validation.error.errors);
            }
            const product = yield db_1.default.product.findUnique({
                where: { id: request.params.pid }
            });
            if (!product) {
                return response.status(404).json({ error: "product not found" });
            }
            const duplicateProduct = yield db_1.default.product.findFirst({
                where: { name: request.body.name }
            });
            if (duplicateProduct && duplicateProduct.id !== product.id) {
                return response.status(409).json({ error: "product is already exists with same name" });
            }
            const updatedProduct = yield db_1.default.product.update({
                where: { id: request.params.pid },
                data: {
                    name: request.body.name,
                    description: request.body.description,
                    price: request.body.price
                },
                include: { variants: true }
            });
            return response.status(200).json(updatedProduct);
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ error: "internal server error" });
        }
    });
}
exports.update = update;
function remove(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield db_1.default.product.findUnique({
                where: { id: request.params.pid }
            });
            if (!product) {
                return response.status(404).json({ error: "product not found" });
            }
            yield db_1.default.product.delete({
                where: { id: request.params.pid },
                include: { variants: true }
            });
            return response.status(204).json({});
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ error: "internal server error" });
        }
    });
}
exports.remove = remove;
function search(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = request.query.q;
            if (!query) {
                return response.status(400).json({ error: "query string required" });
            }
            const products = yield db_1.default.product.findMany({
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
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ error: "internal server error" });
        }
    });
}
exports.search = search;
exports.default = { create, getAll, get, update, remove, search };
