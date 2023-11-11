const { Product, ProductType } = require('../models');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         stock:
 *           type: integer
 *         productTypeId:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Product created successfully
 *               status: success
 *               data: {id: 1, name: 'Example Product'}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *               status: error
 *               error: {}
 */

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    console.log(req.body);
    res.status(201).json({ message: 'Product created successfully', status: 'success', data: product });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Products retrieved successfully
 *               status: success
 *               data: [{id: 1, name: 'Example Product 1'}, {id: 2, name: 'Example Product 2'}]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *               status: error
 *               error: {}
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: [{ model: ProductType }] });
    res.status(200).json({ message: 'Products retrieved successfully', status: 'success', data: products });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Product updated successfully
 *               status: success
 *               data: {id: 1, name: 'Updated Example Product'}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *               status: error
 *               error: {}
 */
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.update(req.body, { where: { id } });
    const updatedProduct = await Product.findByPk(id, { include: [{ model: ProductType }] });
    res.status(200).json({ message: 'Product updated successfully', status: 'success', data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Product deleted successfully
 *               status: success
 *               data: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *               status: error
 *               error: {}
 */
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.destroy({ where: { id } });
    res.status(200).json({ message: 'Product deleted successfully', status: 'success', data: null });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};
