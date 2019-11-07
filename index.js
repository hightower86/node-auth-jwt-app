const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

// Import routes
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');

// Middleware
app.use(express.json());

dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DB...')
);

// Route middlewares
app.use('/api/user', authRouter);
app.use('/api/posts', postRouter);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
