const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const itemRoutes = require('./routes/itemRoutes');
const stockRoutes = require('./routes/stockRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.use('/api', itemRoutes);
app.use('/api', stockRoutes);

module.exports = app;