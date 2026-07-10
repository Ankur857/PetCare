require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('PetCare API is running...');
});

// Routes
app.use('/api/auth', authRoutes);

// Sync DB and Start Server
const PORT = process.env.PORT || 5000;

sequelize
  .sync() // sync models with database
  .then(() => {
    console.log('SQLite Database connected and synced successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });
