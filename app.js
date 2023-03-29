const express = require('express');
const app = express();
const registerUser = require('./routes/khata-app/user');
const parties = require('./routes/khata-app/parties');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.set("strictQuery", false);
//mongoose.connect('mongodb+srv://sbs:umer786@cluster0.2ejqd.mongodb.net/test');
mongoose.connect('mongodb://localhost:27017');

mongoose.connection.on('error',err=>{
    console.log('Connection Failed.');
});

mongoose.connection.on('connected',connected=>{
    console.log('Connected successfully...');
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/user',registerUser);
app.use('/parties',parties);

module.exports = app;