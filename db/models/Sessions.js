const mongoose = require('mongoose');
const { foreignKeyField } = require('../index');

const SessionSchema = mongoose.Schema({
    sid: { type: String, unique: true },
    user: foreignKeyField('User')
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
