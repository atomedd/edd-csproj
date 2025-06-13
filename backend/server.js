const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;


//AUTH OFF FOR NOW
app.use(cors());
//app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  preferences: { type: Object },
});

const User = mongoose.model('User', userSchema);

// Mongo LINK
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

// Routes

// POST
app.post('/users', async (req, res) => {
  try {
    console.log('POST /users body:', req.body);

    const { username, email, preferences } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }

    const newUser = new User({ username, email, preferences });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: error.message });
  }
});


// GET
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, preferences } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, preferences },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
