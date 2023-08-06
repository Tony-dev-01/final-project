'use strict';

const express = require('express');
const morgan = require('morgan');

const { getAllNews } = require('./handlers');


express()
    .use(function(req, res, next) {
    res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
    })

.use(morgan('tiny'))
.use(express.json())


// Insert all endpoints below this line
// --------------------------------------------------------------


.get('/news', getAllNews)



// Catch all endpoint
.get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'This is a catch all. Wrong endpoint. Verify if you are using a valid endpoint.' 
    });
})

.listen(6000, () => console.log('Listening on port 6000'))