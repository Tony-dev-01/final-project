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

module.exports = {
    getAllNews
}