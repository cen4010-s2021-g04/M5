/********************** IMPORTS **********************/
const express = require('express');
const cors = require('cors')
const socketio = require('socket.io');
const passport = require('passport');

const db = require('./server/database')
const userRoutes = require('./server/routes/user-routes');
const authRoutes = require('./server/routes/auth-routes');
const messangerRoutes = require('./server/routes/messanger-routes');

/********************** MAIN **********************/
const app = express();
const PORT = process.env.PORT || 5000; // run the server on either the existing env port or 5000 if not available

// initialize bodyparser
app.use(express.json())
app.use(express.urlencoded( {extended: false} )); // handles taking in form data

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

// initialize user API endpoint
app.use('/', userRoutes);

// initializes JWT auth endpoints
app.use('/', authRoutes);

app.use('/', messangerRoutes);

// initialize cors middleware
app.use(cors());

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.get('/', (req, res) => {
    res.send('Learning the MERN Stack');
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`));