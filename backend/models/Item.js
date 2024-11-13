const db = require('../config/db');

class Item {
  static create(item, callback) {
    const {  name, uom } = item;
    const item_code = `IT${new Date().getTime()}`;
    const sql = 'INSERT INTO Item (item_code, name, uom) VALUES (?, ?, ?)';
    db.query(sql, [item_code, name, uom], callback);
  }

  static getAll(callback) {
    const sql = 'SELECT * FROM Item';
    db.query(sql, callback);
  }
}

module.exports = Item;