const express = require('express');
const cors = require('cors');        
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
