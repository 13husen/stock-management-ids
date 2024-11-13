const db = require('../config/db');

class StockLedger {
  static create(ledgerEntry, callback) {
    const sql = 'INSERT INTO stockledger (item_code, batch_id, create_date, last_stock, qty_in, qty_out, current_stock) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [ledgerEntry.item_code, ledgerEntry.batch_id, ledgerEntry.create_date, ledgerEntry.last_stock, ledgerEntry.qty_in, ledgerEntry.qty_out, ledgerEntry.current_stock], callback);
  }

  static getAll(callback) {
    const sql = `
        SELECT stockledger.*, item.name AS item_name
        FROM stockledger
        JOIN item ON stockledger.item_code = item.item_code;
    `;
    db.query(sql, callback);
}


  static findOne({ item_code, batch_id }) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM stockledger WHERE item_code = ? AND batch_id = ? ORDER BY create_date DESC LIMIT 1';
      db.query(sql, [item_code, batch_id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }
}

module.exports = StockLedger;