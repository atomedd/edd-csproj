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


// Route Files
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3165;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use('/api/steam', steamRoutes);
app.use('/api/auth', authRoutes);
app.use(session({secret: 'your-secret',resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Database connection error:', err));

// Route Middleware
app.use('/api/auth', authRoutes);  // For login, register
app.use('/api/users', userRoutes); // For protected user CRUD routes

// Root Route
app.get('/', (req, res) => res.send('API Running'));

// Real-Time Communication
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('New client connected');

  // Example: Listen for messages
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    io.emit('chat message', msg); // Broadcast to all clients
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Start Server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
