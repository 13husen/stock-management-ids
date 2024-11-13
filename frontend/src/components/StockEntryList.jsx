import React from 'react';

const StockEntryList = ({stockEntries}) => {


  const formatDate = (isoDateString) => {
    return new Date(isoDateString).toISOString().slice(0, 10);
  };
  

  return (<div className="bg-white shadow-md rounded p-6">
    <h2 className="text-2xl font-semibold mb-4">Stock Entries</h2>
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th className="px-4 py-2">Entry ID</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Type</th>
        </tr>
      </thead>
      <tbody>
        {stockEntries.map((entry) => (
          <tr key={entry.entry_id}>
            <td className="border px-4 py-2">{entry.entry_id}</td>
            <td className="border px-4 py-2">{formatDate(entry.create_date)}</td>
            <td className="border px-4 py-2">{entry.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
};

export default StockEntryList;