const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/transactions', transactionController.createTransaction);
router.get('/transactions', transactionController.getTransactions);
router.put('/transactions/:id', transactionController.updateTransaction);
router.delete('/transactions/:id', transactionController.deleteTransaction);
router.get('/transactions/sorted-sold', transactionController.getSortedSoldTransactions);

module.exports = router;
