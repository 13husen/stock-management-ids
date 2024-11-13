const db = require("../config/db");

class StockEntry {
  static create(entry, callback) {
    const sql =
      "INSERT INTO StockEntry (entry_id, create_date, type) VALUES (?, ?, ?)";
    db.query(sql, [entry.entry_id, entry.create_date, entry.type], callback);
  }

  static getAll(callback) {
    const sql = "SELECT * FROM StockEntry";
    db.query(sql, callback);
  }
}

module.exports = StockEntry;
