const db = require('../config/database');

const Gig = require('./models/Gig');

db.sync({ alter: true })
    ,then((result) => {
        Gig.create({ title: "Looking for a React developer", budget: "$300", })
        console.log(result)
    })
    .catch((err) => {
        console.log(err)
    })