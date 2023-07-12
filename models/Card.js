const mongoose = require('./connection');

// schema which will go into model
const cardSchema = new mongoose.Schema({
    name: String,
    color: String, 
    readyToEat: Boolean,
    username: String,
});

// card model
const Card = mongoose.model('card', cardSchema);

module.exports = Card;