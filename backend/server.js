'use strict';

const express = require('express');
const morgan = require('morgan');

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



.listen(6000, () => console.log('Listening on port 6000'))