const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.get('/', (req, res) => res.send('INDEX'));

// Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 3000;

// database
const db = require('./config/database');

// Testing connection
const initApp = async () => {
    console.log('Testing the database connection.');

    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initApp(); 

app.listen(PORT, console.log('Server started on port 3000'));



