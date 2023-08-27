'use strict';

const express = require('express');
const morgan = require('morgan');

const { getAllNews, 
getNews, 
getNewsForTeam,
getAllScoreboards, 
getAllTeamsFromLeague, 
getLeagueLogo,
getTeamSchedule,
getLeagueSchedule,
getLeagueStandings,
getUser, 
getTeamStats,
createUser, 
updateUser,
deleteUser} = require('./handlers');


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

// GET news
.get('/news', getAllNews)
.get('/news/:id', getNews)
.get('/news/:sport/:league/:teamId', getNewsForTeam)

// GET Scoreboards
.get('/scoreboard', getAllScoreboards)

// GET Teams
.get('/teams', getAllTeamsFromLeague)

// GET logos
.get('/logo/:league', getLeagueLogo)

// GET statistics
.get('/statistics/:league/:teamId/:season', getTeamStats)

// GET schedule
.get('/schedule/:league', getLeagueSchedule)
.get('/schedule/:league/:teamId', getTeamSchedule)

// GET standings
.get('/standings/:league', getLeagueStandings)

// User endpoints
// .get('/users')
.get('/users', getUser)
.post('/users', createUser)
.patch('/users', updateUser)
.delete('/users/:userId', deleteUser)

// Catch all endpoint
.get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'This is a catch all. Wrong endpoint. Verify if you are using a valid endpoint.' 
    });
})

.listen(6000, () => console.log('Listening on port 6000'))