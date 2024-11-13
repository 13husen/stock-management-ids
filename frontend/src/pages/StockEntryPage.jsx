
import React, { useState, useEffect } from 'react';
import StockEntryList from '../components/StockEntryList';
import StockEntryForm from '../components/StockEntryForm';
import api from '../api';

const StockEntryPage = () => {
  const [stockEntries, setStockEntries] = useState([]);

  useEffect(() => {
    fetchStockEntries();
  }, []);

  const fetchStockEntries = async () => {
    try {
      api.get('/stock-entry')
      .then((response) => setStockEntries(response.data))
      .catch((error) => console.error(error));
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };


  const handleItemAdded = () => {
    fetchStockEntries();  
  };

  return (
    <div className="container mx-auto p-4">
      <StockEntryList stockEntries={stockEntries} />
      <StockEntryForm handleItemAdded={handleItemAdded} />
    </div>
  );
};

export default StockEntryPage;