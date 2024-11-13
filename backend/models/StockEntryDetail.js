const db = require('../config/db');

class StockEntryDetail {
  static create(detail, callback) {
    const sql = 'INSERT INTO StockEntryDetail (entry_detail_id, entry_id, item_code, batch_id, expiry_date, qty) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [detail.entry_detail_id, detail.entry_id, detail.item_code, detail.batch_id, detail.expiry_date, detail.qty], callback);
  }
}

module.exports = StockEntryDetail;