const db = require("../config/db");

class BatchItem {
  static findOne({ batch_id }) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM batchitem WHERE batch_id = ?";
      db.query(sql, [batch_id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static create(batchData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO batchitem (batch_id, item_code, expiry_date) VALUES (?, ?, ?)";
      db.query(
        sql,
        [batchData.batch_id, batchData.item_code, batchData.expiry_date],
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });
  }

  static getAll(callback) {
    const sql = `
        SELECT batchitem.*, item.name AS item_name
        FROM batchitem
        JOIN item ON batchitem.item_code = item.item_code;
    `;
    db.query(sql, callback);
  }
}

module.exports = BatchItem;
