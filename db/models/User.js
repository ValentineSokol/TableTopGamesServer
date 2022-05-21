const mongoose = require('mongoose');
const { autoIncrementField } = require('../index');

const UserSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    rating: { type: Number, default: 1500 },
    createdAt: { type: Date, default: Date.now() }
});

autoIncrementField(UserSchema);

const User = mongoose.model('User', UserSchema);

module.exports = User;
