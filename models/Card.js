const mongoose = require('./connection');

// schema which will go into model
const cardSchema = new mongoose.Schema({
    img: String,
    name: String,
    level: Number,
    type: String,
    atk: Number,
    def: Number,
    Playable: Boolean,
    username: String,
});

// card model
const Card = mongoose.model('card', cardSchema);

module.exports = Card;