CREATE DATABASE stock_management;

USE stock_management;

CREATE TABLE Item (
  item_code VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100),
  uom VARCHAR(50)
);

CREATE TABLE BatchItem (
  batch_id VARCHAR(50) PRIMARY KEY,
  item_code VARCHAR(50),
  expiry_date DATE,
  FOREIGN KEY (item_code) REFERENCES Item(item_code)
);

CREATE TABLE StockEntry (
  entry_id VARCHAR(50) PRIMARY KEY,
  create_date DATE,
  type ENUM('IN', 'OUT')
);

CREATE TABLE StockEntryDetail (
  entry_detail_id INT AUTO_INCREMENT PRIMARY KEY,
  entry_id VARCHAR(50),
  item_code VARCHAR(50),
  batch_id VARCHAR(50),
  expiry_date DATE,
  qty INT,
  FOREIGN KEY (entry_id) REFERENCES StockEntry(entry_id),
  FOREIGN KEY (item_code) REFERENCES Item(item_code),
  FOREIGN KEY (batch_id) REFERENCES BatchItem(batch_id)
);

CREATE TABLE StockLedger (
  ledger_id INT AUTO_INCREMENT PRIMARY KEY,
  item_code VARCHAR(50),
  batch_id VARCHAR(50),
  create_date DATE,
  last_stock INT,
  qty_in INT,
  qty_out INT,
  current_stock INT,
  FOREIGN KEY (item_code) REFERENCES Item(item_code),
  FOREIGN KEY (batch_id) REFERENCES BatchItem(batch_id)
);


INSERT INTO item (item_code, name, uom)
VALUES
('010101001', 'Cable Tie', 'METER'),
('010102001', 'Bolt', 'EACH'),
('010103001', 'Pin', 'PCS');


INSERT INTO batchitem (batch_id, item_code, expiry_date)
VALUES
('010101001001', '010101001', '2025-01-01'),
('010101001002', '010101001', '2025-01-03'),
('010102001001', '010102001', '2025-10-02'),
('010102001002', '010102001', '2025-04-15'),
('010102001003', '010102001', '2025-10-05'),
('010103001001', '010103001', '2025-04-15');

INSERT INTO stockentry (entry_id, create_date, type)
VALUES
('SE001', '2024-11-05', 'IN'),
('SE002', '2024-11-10', 'OUT');


INSERT INTO stockentrydetail (entry_detail_id, entry_id, item_code, batch_id, expiry_date, qty)
VALUES
(1, 'SE001', '010101001', '010101001001', '2025-01-01', 30),
(2, 'SE001', '010101001', '010101001002', '2025-01-03', 60),
(3, 'SE001', '010102001', '010102001001', '2025-10-02', 40),
(4, 'SE001', '010102001', '010102001002', '2025-04-15', 30),
(5, 'SE001', '010102001', '010102001003', '2025-10-05', 40),
(6, 'SE001', '010103001', '010103001001', '2025-04-15', 70),
(7, 'SE002', '010101001', '010101001001', '2025-01-01', 10),
(9, 'SE002', '010102001', '010102001001', '2025-10-02', 15);

INSERT INTO stockledger (item_code, batch_id, create_date, last_stock, qty_in, qty_out, current_stock)
VALUES
('010101001', '010101001001', '2024-11-05', 0, 30, 0, 30),
('010101001', '010101001002', '2024-11-05', 0, 60, 0, 60),
('010102001', '010102001001', '2024-11-05', 0, 40, 0, 40),
('010102001', '010102001002', '2024-11-05', 0, 30, 0, 30),
('010102001', '010102001003', '2024-11-05', 0, 40, 0, 40),
('010103001', '010103001001', '2024-11-05', 0, 70, 0, 70),
('010101001', '010101001001', '2024-11-10', 30, 0, 10, 20),
('010102001', '010102001001', '2024-11-10', 40, 0, 15, 25);