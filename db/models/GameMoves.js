const mongoose = require('mongoose');

const PositionSchema = mongoose.Schema({
    x: Number,
    y: Number,
});

const GameMoveSchema = {
    from: PositionSchema,
    to: PositionSchema,
    capturedPiecePosition: { type: PositionSchema, required: false },
    moves: { type: [ GameMoveSchema ], required: false }
}

module.exports = GameMoveSchema;