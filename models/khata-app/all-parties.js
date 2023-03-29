const mongoose = require('mongoose');

const parties = new mongoose.Schema({
    serialNumber: String,
    name: String,
    phone: Number,
    address: String,
    detail: String
});

module.exports = mongoose.model('all-parties',parties);