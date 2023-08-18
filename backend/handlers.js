"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require('mongodb');

require("dotenv").config();
const { MONGO_URI } = process.env;

// Options for mongoDB client
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};


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
    console.log(newsId)
    try {
        const request = await fetch(`http://now.core.api.espn.com/v1/sports/news/${newsId}`)
        const data = await request.json()

        res.status(200).json({status: 200, data: data.headlines[0]});
    } catch(err) {
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

        console.log(user);

        if (user === null){
            throw new Error();
        } else if (user.password !== password){
            throw new Error();
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

    const _id = uuidv4();

    userInfo = {...userInfo, _id: _id};

    try {
        client.connect();

        const db = client.db('final-project');

        const result = await db.collection('users').insertOne(userInfo);

        if (result.acknowledged === true) {
            res.status(201).json({status: 201, data: userInfo, message: 'new user created'})
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

        const update = await db.collection('users').updateOne({_id: newUserInfo._id}, {'$set': {...newUserInfo}});

        const user = await db.collection('users').findOne({_id: newUserInfo._id});

        if (update.acknowledged === true){
            res.status(200).json({status: 200, data: user, message: 'user info updated'})
        } else{
            throw new Error()
        }

    } catch(err){
        console.log(err.message)
        res.status(400).json({status: 400, data: newUserInfo, message: err.message})
    }

    client.close();
}

const deleteUser = async (req, res) => {
        const client = new MongoClient(MONGO_URI, options);
        const userId = req.params.userId;

    try {
        client.connect();

        const db = client.db('final-project');

        const result = await db.collection("orders").deleteOne({ _id: userId });

        console.log(user)

        if (result.deletedCount === 0) {
            throw new Error();
        } else{
            res.status(200).json({status: 200, data: newUserInfo, message: 'user info updated'})
        }

    } catch(err){
        console.log(err.message)
        res.status(400).json({status: 400, data: {}, message: err.message})
    }

    client.close();
}

module.exports = {
    getAllNews,
    getNews,
    getAllScoreboards,
    getAllTeamsFromLeague,
    getLeagueLogo,
    getUsers, getUser, createUser, deleteUser, updateUser
}