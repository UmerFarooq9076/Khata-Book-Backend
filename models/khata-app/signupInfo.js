const mongoose = require('mongoose');

const singupInfo = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
});

module.exports = mongoose.model('signup-Info',singupInfo);