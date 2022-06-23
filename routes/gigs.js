const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

const data = {
    title: 'Simple',
    technologies: 'react, javascript, html, css',
    budget: '$3000',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin venenatis lectus in enim blandit, eu maximus leo molestie.',
    contact_email: 'user1@gmail.com'
}

const { title, technologies, budget, description, contact_email } = data;

Gig.bulkCreate([
    { title: data.title, technologies: data.technologies, budget: data.budget, description: data.description, contact_email: data.contact_email }
])
.then(function(gigs) {
    console.log(gigs);
})

module.exports = router;

