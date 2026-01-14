const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const tutorialRoutes = require('./routes/tutorials');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.path}`);
  next();
});

app.post('/test', (req, res) => {
  res.json({ message: 'Direct route works!' });
});

app.use('/api/auth', authRoutes);

app.use('/api/tutorials', tutorialRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.log('❌ MongoDB error:', err.message));

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});