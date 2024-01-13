"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = __importDefault(require("../controllers/products"));
const variants_1 = __importDefault(require("../controllers/variants"));
const router = (0, express_1.Router)();
router.get('/', (_, response) => {
    return response.send('products-variants api');
});
/**
 * @openapi
 * /products/search:
 *   get:
 *     tags:
 *       - search
 *     summary: Search products by name, description, or variant name
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query to filter products
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of products matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the product
 *                   name:
 *                     type: string
 *                     description: The name of the product
 *                   description:
 *                     type: string
 *                     description: The description of the product
 *                   price:
 *                     type: number
 *                     description: The price of the product
 *                   variants:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: The unique identifier of the variant
 *                         name:
 *                           type: string
 *                           description: The name of the variant
 *                         addition_cost:
 *                           type: number
 *                           description: The additional cost of the variant
 *                         stock_count:
 *                           type: integer
 *                           description: The stock count of the variant
 *                         productId:
 *                           type: string
 *                           description: The unique identifier of the product to which the variant belongs
 *       400:
 *         description: Bad Request. Invalid search query.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.get('/products/search', products_1.default.search);
/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - products
 *     summary: Retrieve all products
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the product
 *                   name:
 *                     type: string
 *                     description: The name of the product
 *                   description:
 *                     type: string
 *                     description: The description of the product
 *                   price:
 *                     type: number
 *                     description: The price of the product
 *                   variants:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: The unique identifier of the variant
 *                         name:
 *                           type: string
 *                           description: The name of the variant
 *                         addition_cost:
 *                           type: number
 *                           description: The additional cost of the variant
 *                         stock_count:
 *                           type: integer
 *                           description: The stock count of the variant
 *                         productId:
 *                           type: string
 *                           description: The unique identifier of the product to which the variant belongs
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.get('/products', products_1.default.getAll);
/**
 * @openapi
 * /products:
 *   post:
 *     tags:
 *       - products
 *     summary: Create a new product
 *     requestBody:
 *       description: Product information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *               description:
 *                 type: string
 *                 description: The description of the product
 *               price:
 *                 type: number
 *                 description: The price of the product
 *             required:
 *               - name
 *               - description
 *               - price
 *     responses:
 *       201:
 *         description: Successfully created a new product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the created product
 *                 name:
 *                   type: string
 *                   description: The name of the created product
 *                 description:
 *                   type: string
 *                   description: The description of the created product
 *                 price:
 *                   type: number
 *                   description: The price of the created product
 *       400:
 *         description: Bad Request. Invalid request payload.
 *       409:
 *         description: Conflict. A product with the same name already exists.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.post('/products', products_1.default.create);
/**
 * @openapi
 * /products/{pid}:
 *   get:
 *     tags:
 *       - products
 *     summary: Retrieve a specific product by ID
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the product
 *                 name:
 *                   type: string
 *                   description: The name of the product
 *                 description:
 *                   type: string
 *                   description: The description of the product
 *                 price:
 *                   type: number
 *                   description: The price of the product
 *                 variants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique identifier of the variant
 *                       name:
 *                         type: string
 *                         description: The name of the variant
 *                       addition_cost:
 *                         type: number
 *                         description: The additional cost of the variant
 *                       stock_count:
 *                         type: integer
 *                         description: The stock count of the variant
 *                       productId:
 *                         type: string
 *                         description: The unique identifier of the product to which the variant belongs
 *       404:
 *         description: Not Found. The requested product does not exist.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.get('/products/:pid', products_1.default.get);
/**
 * @openapi
 * /products/{pid}:
 *   put:
 *     tags:
 *       - products
 *     summary: Update a specific product by ID
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to update
 *     requestBody:
 *       description: Updated product information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the product
 *               description:
 *                 type: string
 *                 description: The updated description of the product
 *               price:
 *                 type: number
 *                 description: The updated price of the product
 *             required:
 *               - name
 *               - description
 *               - price
 *     responses:
 *       200:
 *         description: Successfully updated the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the updated product
 *                 name:
 *                   type: string
 *                   description: The updated name of the product
 *                 description:
 *                   type: string
 *                   description: The updated description of the product
 *                 price:
 *                   type: number
 *                   description: The updated price of the product
 *                 variants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique identifier of the variant
 *                       name:
 *                         type: string
 *                         description: The name of the variant
 *                       addition_cost:
 *                         type: number
 *                         description: The additional cost of the variant
 *                       stock_count:
 *                         type: integer
 *                         description: The stock count of the variant
 *                       productId:
 *                         type: string
 *                         description: The unique identifier of the product to which the variant belongs
 *       400:
 *         description: Bad Request. Invalid request payload.
 *       404:
 *         description: Not Found. The requested product does not exist.
 *       409:
 *         description: Conflict. Another product with the same name already exists.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.put('/products/:pid', products_1.default.update);
/**
 * @openapi
 * /products/{pid}:
 *   delete:
 *     tags:
 *       - products
 *     summary: Delete a specific product by ID
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to delete
 *     responses:
 *       204:
 *         description: Successfully deleted the product
 *       404:
 *         description: Not Found. The requested product does not exist.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.delete('/products/:pid', products_1.default.remove);
/**
 * @openapi
 * /products/{pid}/variants:
 *   get:
 *     tags:
 *       - variants
 *     summary: Retrieve all variants of a specific product by ID
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to retrieve variants for
 *     responses:
 *       200:
 *         description: Successfully retrieved variants of the product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the variant
 *                   name:
 *                     type: string
 *                     description: The name of the variant
 *                   addition_cost:
 *                     type: number
 *                     description: The additional cost of the variant
 *                   stock_count:
 *                     type: integer
 *                     description: The stock count of the variant
 *                   productId:
 *                     type: string
 *                     description: The unique identifier of the product to which the variant belongs
 *       404:
 *         description: Not Found. The requested product does not exist.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.get('/products/:pid/variants', variants_1.default.getAll);
/**
 * @openapi
 * /products/{pid}/variants:
 *   post:
 *     tags:
 *       - variants
 *     summary: Create a new variant for a specific product by ID
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to create a variant for
 *     requestBody:
 *       description: Variant information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the variant
 *               addition_cost:
 *                 type: number
 *                 description: The additional cost of the variant
 *               stock_count:
 *                 type: integer
 *                 description: The stock count of the variant
 *             required:
 *               - name
 *               - addition_cost
 *               - stock_count
 *     responses:
 *       201:
 *         description: Successfully created a new variant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the created variant
 *                 name:
 *                   type: string
 *                   description: The name of the created variant
 *                 addition_cost:
 *                   type: number
 *                   description: The additional cost of the created variant
 *                 stock_count:
 *                   type: integer
 *                   description: The stock count of the created variant
 *                 productId:
 *                   type: string
 *                   description: The unique identifier of the product to which the variant belongs
 *       400:
 *         description: Bad Request. Invalid request payload.
 *       404:
 *         description: Not Found. The requested product does not exist.
 *       409:
 *         description: Conflict. Another variant with the same name already exists for the product.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.post('/products/:pid/variants', variants_1.default.create);
/**
 * @openapi
 * /products/{pid}/variants/{vid}:
 *   get:
 *     tags:
 *       - variants
 *     summary: Retrieve a specific variant of a specific product by IDs
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to retrieve a variant for
 *       - in: path
 *         name: vid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the variant to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the variant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the variant
 *                 name:
 *                   type: string
 *                   description: The name of the variant
 *                 addition_cost:
 *                   type: number
 *                   description: The additional cost of the variant
 *                 stock_count:
 *                   type: integer
 *                   description: The stock count of the variant
 *                 productId:
 *                   type: string
 *                   description: The unique identifier of the product to which the variant belongs
 *       400:
 *         description: Bad Request. Invalid request parameters.
 *       404:
 *         description: Not Found. The requested product or variant does not exist.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.get('/products/:pid/variants/:vid', variants_1.default.get);
/**
 * @openapi
 * /products/{pid}/variants/{vid}:
 *   put:
 *     tags:
 *       - variants
 *     summary: Update a specific variant of a specific product by IDs
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to update a variant for
 *       - in: path
 *         name: vid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the variant to update
 *     requestBody:
 *       description: Updated variant information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the variant
 *               addition_cost:
 *                 type: number
 *                 description: The updated additional cost of the variant
 *               stock_count:
 *                 type: integer
 *                 description: The updated stock count of the variant
 *             required:
 *               - name
 *               - addition_cost
 *               - stock_count
 *     responses:
 *       200:
 *         description: Successfully updated the variant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the updated variant
 *                 name:
 *                   type: string
 *                   description: The updated name of the variant
 *                 addition_cost:
 *                   type: number
 *                   description: The updated additional cost of the variant
 *                 stock_count:
 *                   type: integer
 *                   description: The updated stock count of the variant
 *                 productId:
 *                   type: string
 *                   description: The unique identifier of the product to which the variant belongs
 *       400:
 *         description: Bad Request. Invalid request payload.
 *       404:
 *         description: Not Found. The requested product or variant does not exist.
 *       409:
 *         description: Conflict. Another variant with the same name already exists for the product.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.put('/products/:pid/variants/:vid', variants_1.default.update);
/**
 * @openapi
 * /products/{pid}/variants/{vid}:
 *   delete:
 *     tags:
 *       - variants
 *     summary: Delete a specific variant of a specific product by IDs
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to delete a variant from
 *       - in: path
 *         name: vid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the variant to delete
 *     responses:
 *       204:
 *         description: Successfully deleted the variant
 *       400:
 *         description: Bad Request. Product ID and Variant ID mismatch.
 *       404:
 *         description: Not Found. The requested product or variant does not exist.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.delete('/products/:pid/variants/:vid', variants_1.default.remove);
exports.default = router;
