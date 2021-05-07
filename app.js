// Imports
require('dotenv').config()
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const passport = require('passport');
require('./config/passport')(passport);

// App Set up
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: false })); // For images
app.use(express.json()); // JSON parsing
app.use(cors()); // allow all CORS requests
app.use(require('morgan')('dev')); // For Development Debugging
app.use(passport.initialize()); // For Auth


// API Routes
app.get('/api/', (req, res) => {
  res.json({ name: 'Crane API', greeting: 'Welcome to the Crane API', author: 'Joshua Wilson', message: "Hello there!" });
});
 
app.use('/api/users', routes.user);

// Server
const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

// Socket.io stuff
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', socket => {
  console.log(`connect: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

module.exports = server;
