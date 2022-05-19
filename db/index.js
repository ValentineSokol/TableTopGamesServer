const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017');
        console.log('Successfully connected to Mongo.')
    }
    catch(err) {
        console.error('Error while connecting to database!');
    }
}

module.exports = { connect };
