const { ProductType } = require('../models');

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductType:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [Electronics, Clothing, Books]
 */

/**
 * @swagger
 * tags:
 *   name: ProductTypes
 *   description: Operations related to product types
 */

/**
 * @swagger
 * /api/product-types:
 *   post:
 *     summary: Create a new product type
 *     tags: [ProductTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductType'
 *     responses:
 *       201:
 *         description: ProductType created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: ProductType created successfully
 *               status: success
 *               data: {type: 'Example Product Type'}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *               status: error
 *               error: {}
 */
exports.createProductType = async (req, res) => {
  try {
    const productType = await ProductType.create(req.body);
    res.status(201).json({ message: 'ProductType created successfully', status: 'success', data: productType });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

/**
 * @swagger
 * /api/product-types:
 *   get:
 *     summary: Get a list of product types
 *     tags: [ProductTypes]
 *     responses:
 *       200:
 *         description: ProductTypes retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: ProductTypes retrieved successfully
 *               status: success
 *               data: [{id: 1, type: 'Example Product Type 1'}, {id: 2, type: 'Example Product Type 2'}]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *               status: error
 *               error: {}
 */
exports.getProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.findAll();
    res.status(200).json({ message: 'ProductTypes retrieved successfully', status: 'success', data: productTypes });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

/**
 * @swagger
 * /api/product-types/{id}:
 *   put:
 *     summary: Update a product type by ID
 *     tags: [ProductTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product type to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductType'
 *     responses:
 *       200:
 *         description: ProductType updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: ProductType updated successfully
 *               status: success
 *               data: {id: 1, type: 'Updated Example Product Type'}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *               status: error
 *               error: {}
 */
exports.updateProductType = async (req, res) => {
  const { id } = req.params;
  try {
    await ProductType.update(req.body, { where: { id } });
    const updatedProductType = await ProductType.findByPk(id);
    res.status(200).json({ message: 'ProductType updated successfully', status: 'success', data: updatedProductType });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

/**
 * @swagger
 * /api/product-types/{id}:
 *   delete:
 *     summary: Delete a product type by ID
 *     tags: [ProductTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product type to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ProductType deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: ProductType deleted successfully
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
exports.deleteProductType = async (req, res) => {
  const { id } = req.params;
  try {
    await ProductType.destroy({ where: { id } });
    res.status(200).json({ message: 'ProductType deleted successfully', status: 'success', data: null });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};
