import React from 'react';
const ItemList = ({items}) => {

  return (
    <div className="p-4 shadow-lg bg-white rounded">
      <h2 className="text-lg font-bold mb-4">Items</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Item Code</th>
            <th className="p-2">Name</th>
            <th className="p-2">UOM</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.item_code}>
              <td className="border p-2">{item.item_code}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.uom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;