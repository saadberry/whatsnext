const express = require("express")
const userRoutes = require('./app/routes/userRoutes');
const todoRoutes = require('./app/routes/todoRoutes');
const connectToDatabase = require('./connect')

require('dotenv').config();

const PORT = process.env.PORT || 1000;

const app = express()
app.use(express.json());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/todo', todoRoutes);

// Connect to DB
connectToDatabase()
// Init server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

  