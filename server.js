const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const productTypeRoutes = require('./routes/productTypeRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); 
const app = express();
const PORT = 3099;

app.use(cors());
app.use(bodyParser.json());



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api', productRoutes);
app.use('/api', transactionRoutes);
app.use('/api', productTypeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
