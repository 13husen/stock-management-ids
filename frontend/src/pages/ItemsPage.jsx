import React, { useState, useEffect } from 'react';
import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';
import api from '../api';

const ItemsPage = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      api.get('/items')
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleItemAdded = () => {
    fetchItems();  
  };

  return (
    <div className="container mx-auto p-4">
      <ItemList items={items} />
      <ItemForm onItemAdded={handleItemAdded} />
    </div>
  );
};

export default ItemsPage;
