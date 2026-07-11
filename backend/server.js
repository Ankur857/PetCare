require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const rescueRoutes = require('./routes/rescueRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Basic Route
app.get('/', (req, res) => {
  res.send('PetCare API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rescue', rescueRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/appointments', appointmentRoutes);

// Connect DB and Start Server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  });
});
