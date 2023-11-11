const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const productTypeRoutes = require('./routes/productTypeRoutes');

const app = express();
const PORT = 3099;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', productRoutes);
app.use('/api', transactionRoutes);
app.use('/api', productTypeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
