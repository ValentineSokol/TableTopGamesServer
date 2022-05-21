const mongoose = require('mongoose');
const AutoIncrementPlugin = require('mongoose-sequence');

let dbInstance;

async function connect() {
    try {
        dbInstance = await mongoose.connect('mongodb://localhost:27017/checkers');

        console.log('Successfully connected to Mongo.')
    }
    catch(err) {
        console.error('Error while connecting to database!');
    }
}

function autoIncrementField(schema, field = 'id') {
    if (!dbInstance) return;
    AutoIncrementPlugin(dbInstance)(schema, { inc_field: field });
}

function foreignKeyField(collection) {
    return { type: mongoose.Schema.Types.ObjectId, ref: collection };
}

module.exports = { connect, autoIncrementField, foreignKeyField };
