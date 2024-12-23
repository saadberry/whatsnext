/*
This is the entry point of our server
*/
const express = require("express")
const cors = require('cors');

const userRoutes = require('./app/routes/userRoutes');
const todoRoutes = require('./app/routes/todoRoutes');
const connectToDatabase = require('./connect')

require('dotenv').config();

const PORT = process.env.PORT || 1000;

const app = express()
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
}));
// Define routes
app.use('/v1/api/users', userRoutes);
app.use('/v1/api/todo', todoRoutes);

// Connect to DB
connectToDatabase()
// Init server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });


app.use('/v1/api/', (req, res) => {
  res.json({response: "Hello World!"})
});

  