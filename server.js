require('dotenv').config();

const express = require('express');
const bodyParder = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const app = express();
const port = 8000;

app.use(bodyParder.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //if you don't add this it will use MongoDB driver's deprecated
    //findOneAndUpdate instead of Mongoose's findOneAndUpdate
    useFindAndModify: false
}, (err, database) => {
    if (err) return console.log("Something went wrong", err.name);

    require('./app/routes/index')(app, database);
    app.listen(port, 'noteapp', () => {
        console.log("I am alive on", port);
    });
});