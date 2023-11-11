const { Sequelize } = require('sequelize');
const { Transaction, Product, ProductType } = require('../models');

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         quantitySold:
 *           type: integer
 *         productId:
 *           type: integer
 *         transactionDate:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Transaction created successfully
 *               status: success
 *               data: {id: 1, quantitySold: 10, productId: 1, transactionDate: '2023-11-11T12:00:00.000Z'}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *               status: error
 *               error: {}
 */

exports.createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json({ message: 'Transaction created successfully', status: 'success', data: transaction });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get a list of transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Transactions retrieved successfully
 *               status: success
 *               data: [{id: 1, quantitySold: 10, productId: 1, transactionDate: '2023-11-11T12:00:00.000Z'}]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *               status: error
 *               error: {}
 */

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ include: [{ model: Product, include: [ProductType] }] });
    res.status(200).json({ message: 'Transactions retrieved successfully', status: 'success', data: transactions });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Update a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the transaction to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Transaction updated successfully
 *               status: success
 *               data: {id: 1, quantitySold: 15, productId: 1, transactionDate: '2023-11-11T12:00:00.000Z'}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *               status: error
 *               error: {}
 */

exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await Transaction.update(req.body, { where: { id } });
    const updatedTransaction = await Transaction.findByPk(id, { include: [{ model: Product, include: [ProductType] }] });
    res.status(200).json({ message: 'Transaction updated successfully', status: 'success', data: updatedTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the transaction to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Transaction deleted successfully
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

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await Transaction.destroy({ where: { id } });
    res.status(200).json({ message: 'Transaction deleted successfully', status: 'success', data: null });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

/**
 * @swagger
 * /api/transactions/sorted-sold:
 *   get:
 *     summary: Get sorted sold transactions
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         description: Start date for filtering transactions
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         description: End date for filtering transactions
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Transactions retrieved successfully
 *               status: success
 *               data: [{id: 1, totalQuantitySold: 25, totalQuantityTransaction: 3, Product: {id: 1, name: 'Example Product'}}]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *               status: error
 *               error: {}
 */

exports.getSortedSoldTransactions = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const whereClause = {};

    if (startDate && endDate) {
      whereClause.transactionDate = {
        [Sequelize.Op.between]: [startDate, endDate],
      };
    }

    const transactions = await Transaction.findAll({
      attributes: [
        'id',
        'quantitySold',
        [Sequelize.fn('sum', Sequelize.col('quantitySold')), 'totalQuantitySold'],
        [Sequelize.fn('count', Sequelize.literal('1')), 'totalQuantityTransaction'],
      ],
      include: [
        {
          model: Product,
          include: [
            {
              model: ProductType,
              attributes: ['id', 'type'],
            },
          ],
        },
      ],
      where: whereClause,
      group: ['Product.id'],
      order: [[Sequelize.literal('totalQuantitySold'), 'DESC']],
    });

    res.status(200).json({ message: 'Transaction retrieved successfully', status: 'success', data: transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};