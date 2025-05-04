require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const security = require('./middlewares/security');

const userRoutes = require('./routes/user');
const clientRoutes = require('./routes/client');
const repairRoutes = require('./routes/repair');
const paymentRoutes = require('./routes/payment');
const stockRoutes = require('./routes/stock');

const app = express();

app.use(express.json());
security(app);

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas principais
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/repairs', repairRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/stock', stockRoutes);

app.get('/', (req, res) => res.send('API CelularFix rodando!'));

module.exports = app;
