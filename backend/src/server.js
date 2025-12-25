const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Debug: Log all incoming requests
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.path}`);
  next();
});

app.post('/test', (req, res) => {
  res.json({ message: 'Direct route works!' });
});
// Routes - MUST be after middleware, before listen
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server works!');
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.log('❌ MongoDB error:', err.message));

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});