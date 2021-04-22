const mongoose = require('mongoose');

// uri to connect to the database
const uri = 'mongodb+srv://lrice:BEwG5UsJsBBnkmoa@cc-cluster0.qrc6z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// connects to the MongoDB server via mongoose
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.log('Connection error: ', e.message);
    });

const db = mongoose.connection;

module.exports = db;