"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

require("dotenv").config();
const { MONGO_URI } = process.env;

// Options for mongoDB client
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};


const hashPassword = async (password) => {
    const salt = await bcrypt.genSaltSync(10);
    const saltRounds = 10;
    // const hash = bcrypt.hashSync(password, salt);
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
};

const compareHash = (password, hashedPass) => {
    return bcrypt.compareSync(password, hashedPass);
}

// GET endpoints

const getAllNews = async (req, res) => {
    try {
        const request = await fetch('https://now.core.api.espn.com/v1/sports/news');
        const data = await request.json()

        res.status(200).json({status: 200, data: data.headlines});
    } catch (err) {
        console.log(err.message)
    }
}

const getNews = async (req, res) => {
    const newsId = req.params.id;
    
    try {
        const request = await fetch(`http://now.core.api.espn.com/v1/sports/news/${newsId}`)
        const data = await request.json()

        res.status(200).json({status: 200, data: data.headlines[0]});
    } catch(err) {
        res.status(404).json({status: 404, data: {}, message: 'not found'});
        console.log(err.message)
    }
};

const getNewsForTeam = async (req, res) => {
    const league = req.params.league;
    const teamId = req.params.teamId;
    const sport = req.params.sport;

    try {
        const request = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/news?team=${teamId}`);
        const data = await request.json();

        res.status(200).json({status: 200, data: data});
    } catch (err) {
        res.status(404).json({status: 404, data: {}, message: 'not found'});
        console.log(err.message)
    }
};

const getScoreboard = async (req, res) => {
    try {
        const request = await fetch(`https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=baseball&league=mlb&region=us&lang=en&contentorigin=espn&buyWindow=1m&showAirings=buy%2Clive%2Creplay&showZipLookup=true&tz=America%2FNew_York`)
    } catch(err) {
        console.log(err.message)
    }
}

const getAllScoreboards = async (req, res) => {
    try {
        const request = await fetch(`https://site.web.api.espn.com/apis/v2/scoreboard/header`)
        const data = await request.json()

        if (data.code === 404){
            throw new Error('not found')
        }
        res.status(200).json({status: 200, data: data})
    } catch(err) {
        console.log(err.message)
        res.status(404).json({status: 404, data: {}, message: err.message})
    }
}


const getAllTeamsFromLeague = async (req, res) => {
    const sport = req.query.sport;
    const league = req.query.league;

    try {
        const request = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/teams`);
        const data = await request.json();
        
        let teamsList;
        
        data.sports[0].leagues.forEach((l) => {
            if (l.slug === league){
                teamsList = l.teams;
            }
        })

        res.status(200).json({status: 200, data: teamsList.map((team) => team.team)})

    } catch(err){
        console.log(err.message)
        res.status(400).json({status: 400, data: {}, message: err.message})
    }
}

const getLeagueLogo = async (req, res) => {
    const league = req.params.league;
    // league = league.toLowerCase();

    try {
        const request = await fetch(`https://a.espncdn.com/i/teamlogos/leagues/500/${league}.png`);
        const data = await request.json();

        res.status(200).json({status: 200, data: data})
    } catch(err){
        console.log(err.message);
        res.status(404).json({status: 404, data: {}, message: err.message})
    }
}

const getTeamStats = async (req, res) => {
    const teamId = req.params.teamId;
    const season = req.params.season;
    const league = req.params.league;
    let sport;

    if (league === 'nfl'){
        sport = 'football'
    } else if (league === 'nhl'){
        sport = 'hockey'
    } else if (league === 'nba'){
        sport = 'basketball'
    } else if (league === 'mlb'){
        sport = 'baseball'
    }

    try {   
        const request = await fetch(`http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/seasons/${season}/types/1/teams/${teamId}/statistics`);
        const data = await request.json();

        if (data.error !== undefined){
            if (data.error.code !== undefined && data.error.code === 404){
                throw new Error(data.error.message);
            }
        } else {
            res.status(200).json({status: 200, data: data});
        }

    } catch(err){
        console.log(err)
        res.status(404).json({status: 404, data: {}, message: err.message})
    }
};

const getTeamSchedule = async (req, res) => {
    const league = req.params.league;
    const teamId = req.params.teamId;
    let data;
    let request;
    let teamSchedule = [];

    try {  
        request = await fetch(`https://cdn.espn.com/core/${league}/schedule?xhr=1`);

        data = await request.json();

        if (data.error !== undefined){
                if (data.error.code !== undefined && data.error.code === 404){
                    throw new Error(data.error.message);
                }
            } else {
                // filter results to return only the schedule of a specific team
                let dates = Object.keys(data.content.schedule);
                
                dates.forEach((date) => {
                    let day = data.content.schedule[date]
                    if (day.games !== undefined && day.games.length > 0){
                        day.games.forEach((game) => {
                            game.competitions[0].competitors.forEach((team) => {
                                if (team.id == teamId){
                                    teamSchedule.push(game);
                                }
                            })
                        })
                    }
                })
                res.status(200).json({status: 200, data: teamSchedule});
            }

    } catch(err){
        console.log(err)
        res.status(404).json({status: 404, data: {}, message: err.message})
    }
}

const getLeagueSchedule = async (req, res) => {
    const league = req.params.league;
    let data;
    let request;
    let date;

    if (req.query.date){
        date = req.query.date;
    }

    try {  
        request = await fetch(`https://cdn.espn.com/core/${league}/schedule?xhr=1&date=${date}`);

        data = await request.json();

        if (data.error !== undefined){
                if (data.error.code !== undefined && data.error.code === 404){
                    throw new Error(data.error.message);
                }
            } else {
                res.status(200).json({status: 200, data: data.content});
            }

    } catch(err){
        console.log(err)
        res.status(404).json({status: 404, data: {}, message: err.message})
    }
}

const getLeagueStandings = async (req, res) => {
    const league = req.params.league;

    try {  
        const request = await fetch(`https://cdn.espn.com/core/${league}/standings?xhr=1`);

        const data = await request.json();

        if (data.error !== undefined){
                if (data.error.code !== undefined && data.error.code === 404){
                    throw new Error(data.error.message);
                }
            } else {
                res.status(200).json({status: 200, data: data.content.standings});
            }

    } catch(err){
        console.log(err)
        res.status(404).json({status: 404, data: {}, message: err.message})
    }
}


// Users handlers
const getUsers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        client.connect();

        const db = client.db('final-project');

    } catch(err){

    }

    client.close();
}

// Connect user
const getUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const userName = req.query.userName;
    const password = req.query.password;

    try {
        client.connect();

        const db = client.db('final-project');

        const user = await db.collection('users').findOne({userName : userName});

        const passwordMatch = await compareHash(password, user.password);

        if (user === null){
            throw new Error();
        }  else if (!passwordMatch){
            throw new Error('Password is incorrect.');
        } else{
            res.status(200).json({status: 200, data: user});
        }


    } catch(err){
        res.status(404).json({status: 404, data: {}, message: 'wrong username and/or password'})
    }

    client.close();
}

const createUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    let userInfo = req.body;
    const saltRounds = 10;

    try {
        client.connect();

        const db = client.db('final-project');


        // encrypt user password
        const hashedPassword = await hashPassword(userInfo.password);

        const _id = uuidv4();

        const results = await db.collection('users').insertOne({...userInfo, password: hashedPassword, _id: _id});

        if (results.acknowledged === true) {
            res.status(201).json({status: 201, data: {...userInfo, _id: _id}, message: 'new user created'})
        };

    } catch(err){
        console.log(err.message)
        res.status(400).json({status: 400, data: {}, message: err.message})
    }

    client.close();
}

const updateUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    let newUserInfo = req.body;

    try {
        client.connect();

        const db = client.db('final-project');

        if (newUserInfo.newPassword !== undefined){
            let currentUserInfo = await db.collection('users').findOne({_id: newUserInfo._id});

            // Check if current user password match
            const passwordMatch = await compareHash(newUserInfo.currentPassword, currentUserInfo.password);
            
            if (passwordMatch){
                // Hash new password
                // const hashedPassword = await bcrypt.hash(userInfo.newPassword, saltRounds);
                const hashedPassword = await hashPassword(newUserInfo.newPassword);

                const update = await db.collection('users').updateOne({_id: newUserInfo._id}, {'$set': {"password": hashedPassword}});

                if (update.acknowledged === true){
                    const user = await db.collection('users').findOne({_id: newUserInfo._id});
                    res.status(200).json({status: 200, data: user, message: 'user info updated'})
                } else {
                    throw new Error()
                }
            } else {
                throw new Error ('Current password is incorrect.')
            }
        } else {
            const update = await db.collection('users').updateOne({_id: newUserInfo._id}, {'$set': {...newUserInfo}});
            const user = await db.collection('users').findOne({_id: newUserInfo._id});

            if (update.acknowledged === true){
                res.status(200).json({status: 200, data: user, message: 'user info updated'})
            } else{
                throw new Error()
            }
        }

    } catch(err){
        console.log(err.message)
        res.status(400).json({status: 400, data: newUserInfo, message: err.message})
    }

    // client.close();
}

const deleteUser = async (req, res) => {
        const client = new MongoClient(MONGO_URI, options);
        const userId = req.params.userId;

    try {
        client.connect();

        const db = client.db('final-project');

        const result = await db.collection("users").deleteOne({ _id: userId });

        res.status(200).json({status: 200, data: {}, message: 'user deleted'})

    } catch(err){
        console.log(err.message)
        res.status(400).json({status: 400, data: {}, message: err.message})
    }

    client.close();
}

module.exports = {
    getAllNews,
    getNews,
    getNewsForTeam,
    getAllScoreboards,
    getAllTeamsFromLeague,
    getLeagueLogo,
    getTeamStats,
    getTeamSchedule,
    getLeagueSchedule,
    getLeagueStandings,
    getUsers, getUser, createUser, deleteUser, updateUser
}