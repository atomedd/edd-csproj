const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const steamRoutes = require('./routes/steam');
const authRoutes = require('./routes/auth');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');


const userRoutes = require('./routes/users');

const app = express();
app.use('/users', userRoutes);
const PORT = process.env.PORT || 3165;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET || 'supersecretkey', resave: false, saveUninitialized: false, cookie: { secure: false }}));

//STEAM STUFF
app.use('/api/steam', steamRoutes);
app.use(passport.initialize());
app.use(passport.session());



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Database connection error:', err));

// Route Middleware
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => res.send('API Running'));

// Start Server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
