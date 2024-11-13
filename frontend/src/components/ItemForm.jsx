import React, { useState } from 'react';
import api from '../api';

const ItemForm = ({ onItemAdded }) => {
  const [form, setForm] = useState({ item_code: '', name: '', uom: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/items', form)
      .then(() => {
        alert('Item added successfully')
        onItemAdded();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="p-4 shadow-lg bg-white rounded mt-4">
      <h2 className="text-lg font-bold mb-4">Add Item</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full mb-2"/>
        <input name="uom" placeholder="UOM" onChange={handleChange} className="border p-2 w-full mb-2"/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;