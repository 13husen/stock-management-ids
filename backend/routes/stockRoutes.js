const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.post('/stock-entry', stockController.createStockEntry);
router.get('/stock-ledger', stockController.getStockLedger);
router.get('/stock-entry', stockController.getStockEntry);
router.get('/batch-items', stockController.getBatchItems);

module.exports = router;