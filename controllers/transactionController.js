const { Sequelize } = require('sequelize');
const { Transaction, Product, ProductType } = require('../models');

exports.createTransaction = async (req, res) => {
  console.log(req.body);
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json({ message: 'Transaction created successfully', status: 'success', data: transaction });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ include: [{ model: Product, include: [ProductType] }] });
    res.status(200).json({ message: 'Transactions retrieved successfully', status: 'success', data: transactions });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

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

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await Transaction.destroy({ where: { id } });
    res.status(200).json({ message: 'Transaction deleted successfully', status: 'success', data: null });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

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