const { apply } = require('body-parser');
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// Get gig list
router.get('/', (req, res) =>
    Gig.findAll()
        .then(gigs => {
            console.log(gigs);
            res.render('gigs', {
                gigs: gigs
            });
        })
    .catch(err => console.log(err)));    

const data = {
    title: 'Simple',
    technologies: 'react, javascript, html, css',
    budget: '$3000',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin venenatis lectus in enim blandit, eu maximus leo molestie.',
    contact_email: 'user1@gmail.com'
}

const { title, technologies, budget, description, contact_email } = data;


// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {
    let { title, technologies, budget, description, contact_email } = req.body;
    let errors = [];

    // Validate Fields
    if(!title) {
        errors.push({ text: "Please add a title" });
    }

    if(!technologies) {
        errors.push({ text: "Please add some technologies" });
    }

    if(!description) {
        errors.push({ text: "Please add a description" });
    }

    if(!contact_email) {
        errors.push({ text: "Please add a contact email" });
    }

    // Check for errors
    if(errors.length > 0) {
        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        });
    } else {
        if(!budget) {
            budget = "Unknown";
        } else {
            budget = "$${budget}";
        }

        // Make lowercase and remove space after comma
        technologies = technologies.toLowerCase().replace(/, []+/g, ',');

        // Insert into table
        Gig.bulkCreate([
            { title: data.title, technologies: data.technologies, budget: data.budget, description: data.description, contact_email: data.contact_email }
        ])
        .then(function(gigs) {
            console.log(gigs);
        })
    }
})

// Search for gigs
router.get('/search', (req, res) => {
    const { term } = req.query;

    Gig.findAll({ where: { technologies: { [0p.like]: '%' + term + '%' }}})
        .then(gigs => res.render('gigs', { gigs }))
        .catch(err => console.log(err));
})



module.exports = router;

