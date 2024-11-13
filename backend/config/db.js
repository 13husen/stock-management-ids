const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'stock_management'
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

module.exports = db;