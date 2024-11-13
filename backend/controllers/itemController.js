const Item = require('../models/Item');

exports.createItem = (req, res) => {
  
  const itemData = req.body;
  Item.create(itemData, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send('Item added successfully');
  });
};

exports.getAllItems = (req, res) => {
  Item.getAll((err, items) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(items);
  });
};