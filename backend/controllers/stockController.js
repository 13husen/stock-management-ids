const StockEntry = require("../models/StockEntry");
const StockLedger = require("../models/StockLedger");
const BatchItem = require("../models/BatchItem");
const StockEntryDetail = require("../models/StockEntryDetail");


exports.createStockEntry = async (req, res) => {
  const { create_date, type, details } = req.body;
  const entry_id = `SE${new Date().getTime()}`;
  try {
    await StockEntry.create({ entry_id, create_date, type });

    for (const detail of details) {
      const { item_code, batch_id, qty } = detail;

      let batchItem = await BatchItem.findOne({ batch_id });
      if (!batchItem && type === 'IN') {
        await BatchItem.create({ batch_id, item_code, expiry_date: detail.expiry_date });
      } else if (!batchItem && type === 'OUT') {
        return res.status(400).send({ error: 'Batch item tidak ditemukan untuk tipe OUT' });
      }

      await StockEntryDetail.create({ ...detail, entry_id });

      const lastLedger = await StockLedger.findOne({ item_code, batch_id });

      const lastStock = lastLedger ? lastLedger.current_stock : 0;
      const qty_in = type === 'IN' ? qty : 0;
      const qty_out = type === 'OUT' ? qty : 0;
      const current_stock = lastStock + qty_in - qty_out;

      const ledgerData = {
        item_code,
        batch_id,
        create_date,
        last_stock: lastStock,
        qty_in,
        qty_out,
        current_stock
      };
      await StockLedger.create(ledgerData);
    }

    res.status(201).send('Stock entry and ledger updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Terjadi kesalahan saat menambahkan stock entry dan ledger' });
  }
};

exports.getStockLedger = (req, res) => {
  StockLedger.getAll((err, ledger) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(ledger);
  });
};


exports.getStockEntry = (req, res) => {
  StockEntry.getAll((err, ledger) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(ledger);
  });
};


exports.getBatchItems = (req, res) => {
  BatchItem.getAll((err, batchitems) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(batchitems);
  });
};
