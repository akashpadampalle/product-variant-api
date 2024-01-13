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
exports.remove = exports.update = exports.create = exports.get = exports.getAll = void 0;
const db_1 = __importDefault(require("../configs/db"));
const variants_1 = __importDefault(require("../schemas/variants"));
function getAll(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { pid } = request.params;
            const product = yield db_1.default.product.findUnique({
                where: { id: pid }
            });
            if (!product) {
                return response.status(404).json({ error: "product not found." });
            }
            const variants = yield db_1.default.variant.findMany({
                where: { productId: pid }
            });
            return response.status(200).json(variants);
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
            const { pid, vid } = request.params;
            const product = yield db_1.default.product.findUnique({
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
            const { pid } = request.params;
            const validation = variants_1.default.variantSchema.safeParse(request.body);
            if (!validation.success) {
                return response.status(400).json(validation.error.errors);
            }
            const product = yield db_1.default.product.findUnique({
                where: { id: pid },
                include: { variants: true }
            });
            if (!product) {
                return response.status(404).json({ error: "product not found" });
            }
            const match = product.variants.find((variant) => variant.name === request.body.name);
            if (match) {
                return response.status(409).json({ error: "variant is already exists in this product" });
            }
            const variant = yield db_1.default.variant.create({
                data: {
                    name: request.body.name,
                    addition_cost: request.body.addition_cost,
                    stock_count: request.body.stock_count,
                    productId: product.id
                }
            });
            return response.status(201).json(variant);
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
            const { pid, vid } = request.params;
            const validation = variants_1.default.variantSchema.safeParse(request.body);
            if (!validation.success) {
                return response.status(400).json(validation.error.errors);
            }
            const product = yield db_1.default.product.findUnique({
                where: { id: pid },
                include: { variants: true }
            });
            if (!product) {
                return response.status(404).json({ error: "product not found" });
            }
            const variant = yield db_1.default.variant.findUnique({
                where: { id: vid }
            });
            if (!variant) {
                return response.status(404).json({ error: "variant not found" });
            }
            if (variant.productId !== product.id) {
                return response.status(400).json({ error: "variant id and product id mismatch" });
            }
            const match = product.variants.find((variant) => variant.name === request.body.name);
            if (match && match.id !== variant.id) {
                return response.status(409).json({ error: "variant is already exists in this product" });
            }
            const updatedvariant = yield db_1.default.variant.update({
                where: { id: vid },
                data: {
                    name: request.body.name,
                    addition_cost: request.body.addition_cost,
                    stock_count: request.body.stock_count
                }
            });
            return response.status(200).json(updatedvariant);
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
            const { pid, vid } = request.params;
            const product = yield db_1.default.product.findUnique({
                where: { id: pid }
            });
            if (!product) {
                return response.status(404).json({ error: "product not found" });
            }
            const variant = yield db_1.default.variant.findUnique({
                where: { id: vid }
            });
            if (!variant) {
                return response.status(404).json({ error: "variant not found" });
            }
            if (variant.productId !== product.id) {
                return response.status(400).json({ error: "variant id and product id mismatch" });
            }
            yield db_1.default.variant.delete({
                where: { id: variant.id }
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
exports.default = { getAll, get, create, update, remove };
