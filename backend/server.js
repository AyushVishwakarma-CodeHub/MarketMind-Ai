const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/segments', require('./routes/segmentRoutes'));
app.use('/api/campaigns', require('./routes/campaignRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MarketMind AI Backend is running 🚀' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 MarketMind AI server running on port ${PORT}`);
});
