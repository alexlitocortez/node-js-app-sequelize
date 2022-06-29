const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const Gig = require('./models/Gig');

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }))

// Gig routes
app.use('/gigs', require('./routes/gigs'));


const PORT = process.env.PORT || 3000;

// databasef
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



