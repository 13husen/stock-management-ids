import React, { useEffect, useState } from 'react';
import api from '../api';

const StockLedgerReport = () => {
  const [stockEntries, setStockEntries] = useState([]);

  useEffect(() => {
    api.get('/stock-ledger')
      .then((response) => setStockEntries(response.data))
      .catch((error) => console.error(error));
  }, []);

  const formatDate = (isoDateString) => {
    return new Date(isoDateString).toISOString().slice(0, 10);
  };

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Stock Ledger Report</h2>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Item Code</th>
            <th className="px-4 py-2">Item Name</th>
            <th className="px-4 py-2">Qty In</th>
            <th className="px-4 py-2">Qty Out</th>
            <th className="px-4 py-2">Current Stock</th>
          </tr>
        </thead>
        <tbody>
          {stockEntries.map((entry) => (
            <tr key={entry.item_code + entry.create_date}>
              <td className="border px-4 py-2">{formatDate(entry.create_date)}</td>
              <td className="border px-4 py-2">{entry.item_code}</td>
              <td className="border px-4 py-2">{entry.item_name}</td>
              <td className="border px-4 py-2">{entry.qty_in}</td>
              <td className="border px-4 py-2">{entry.qty_out}</td>
              <td className="border px-4 py-2">{entry.current_stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default StockLedgerReport;