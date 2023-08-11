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
    const sport = req.query.sport.toLowerCase();
    const league = req.query.league.toLowerCase();

    try {
        const request = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams`);
        const data = await request.json();

        res.status(200).json({status: 200, data: data.sports[0]})
    } catch(err){
        console.log(err.message)
        res.status(400).json({status: 400, data: {}, message: err.message})
    }
}

const getLeagueLogo = async (req, res) => {
    const league = req.params.league.toLowerCase();

    try {
        const request = await fetch(`https://a.espncdn.com/i/teamlogos/leagues/500/${league}.png`);
        const data = await request.json();

        res.status(200).json({status: 200, data: data})
    } catch(err){
        console.log(err.message);
        res.status(404).json({status: 404, data: {}, message: err.message})
    }
}

module.exports = {
    getAllNews,
    getNews,
    getAllScoreboards,
    getAllTeamsFromLeague,
    getLeagueLogo
}