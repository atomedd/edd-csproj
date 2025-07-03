const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const steamRoutes = require('./routes/steam');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const app = express();
const PORT = process.env.PORT || 3165;
const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.0.53:3000',
];

// MIDDLEWARE
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(session({ 
  secret: process.env.SESSION_SECRET || 'supersecretkey', 
  resave: false, 
  saveUninitialized: false, 
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

// STEAM STUFF
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/steam', steamRoutes);

// Test route
app.get('/', (req, res) => res.send('API Running'));

// MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Database connection error:', err));

// SERVER RUNNING
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
