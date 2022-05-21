const mongoose = require('mongoose');
const { autoIncrementField, foreignKeyField } = require('../index');
const MoveSchema = require('./GameMoves');

const GameSchema = mongoose.Schema({
    playerOne: foreignKeyField('User'),
    playerTwo: foreignKeyField('User'),
    winner: foreignKeyField('User'),
    moves: [MoveSchema],
    createdAt: { type: Date, default: Date.now() },
});

autoIncrementField(GameSchema);

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
