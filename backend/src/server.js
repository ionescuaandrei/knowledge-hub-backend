const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log(err);
  });

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Server works!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});