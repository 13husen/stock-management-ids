import React, { useState, useEffect } from 'react';
import api from '../api';

const StockEntryForm = ({ onItemAdded }) => {
  const [entry, setEntry] = useState({ create_date: '', type: 'IN', details: [] });
  const [detail, setDetail] = useState({ item_code: '', batch_id: '', expiry_date: '', qty: '' });
  const [items, setItems] = useState([]);
  const [batchItems, setBatchItems] = useState([]);

  useEffect(() => {
    handleTypeChange('IN')
    api.get('/items')
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));

    api.get('/batch-items')
      .then((response) => setBatchItems(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleTypeChange = (type) => {
    setEntry((prev) => ({ ...prev, type }));
    if (type === 'IN') {
      setDetail((prevDetail) => ({ ...prevDetail, batch_id: `BIT${new Date().getTime()}` }));
    } else {
      setDetail((prevDetail) => ({ ...prevDetail, batch_id: '', item_code: '' }));
    }
  };

  const addDetail = () => {
    if (detail.item_code && detail.batch_id && detail.qty) {
      setEntry((prev) => ({
        ...prev,
        details: [...prev.details, detail]
      }));
      setDetail({ item_code: '', batch_id: '', expiry_date: '', qty: '' });
    } else {
      alert("Please fill out all required fields in detail.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (entry.details.length === 0) {
      alert("Please add at least one detail item.");
      return;
    }
    api.post('/stock-entry', entry)
      .then(() => {
        alert('Stock entry added successfully');
        onItemAdded();
      })
      .catch((error) => console.error(error));
  };

  const handleBatchChange = (value) => {
    let findBatch = batchItems.find(item => item.batch_id === value);
    setDetail({ ...detail, item_code: findBatch.item_code, batch_id: findBatch.batch_id })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg mt-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Stock Entry</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          value={entry.create_date}
          onChange={(e) => setEntry({ ...entry, create_date: e.target.value })}
          className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Type</label>
        <select
          value={entry.type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
        </select>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">Add Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {entry.type === "OUT" ? (<select
            value={detail.batch_id}
            onChange={(e) => handleBatchChange(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="">Select Batch Item</option>
            {batchItems.map((item) => (
              <option key={item.id} value={item?.batch_id}>
                {item?.batch_id} - {item?.item_code} - {item?.item_name}
              </option>
            ))}
          </select>) : ""}

          <select
            value={detail.item_code}
            onChange={(e) => setDetail({ ...detail, item_code: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            disabled={entry.type === 'OUT'}
          >
            <option value="">Select Item Code</option>
            {items.map((item) => (
              <option key={item.id} value={item.item_code}>
                {item?.item_code} - {item?.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Batch ID"
            value={detail.batch_id}
            disabled={true}
            onChange={(e) => setDetail({ ...detail, batch_id: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            placeholder="Expiry Date"
            value={detail.expiry_date}
            onChange={(e) => setDetail({ ...detail, expiry_date: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={detail.qty}
            onChange={(e) => setDetail({ ...detail, qty: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={addDetail}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Add Detail
        </button>
      </div>

      {entry.details.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Detail List</h3>
          <ul className="list-disc list-inside">
            {entry.details.map((item, index) => (
              <li key={index} className="mb-1">
                <span className="font-medium">Item Code:</span> {item.item_code},
                <span className="font-medium"> Batch ID:</span> {item.batch_id},
                <span className="font-medium"> Expiry Date:</span> {item.expiry_date || 'N/A'},
                <span className="font-medium"> Quantity:</span> {item.qty}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
      >
        Submit Stock Entry
      </button>
    </form>
  );
};

export default StockEntryForm;
