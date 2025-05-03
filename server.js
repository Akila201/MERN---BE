const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./Config/db');
const authRoutes = require('./Routes/AuthRoutes');
const postRoutes = require('./Routes/PostRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors()); 
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Simple Blog API Running');
});

app.use('/api', authRoutes);
app.use('/api/posts', postRoutes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));