const crypto = require('crypto');
const bcrypt = require('bcryptjs');

async function hash(plaintext) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plaintext, salt);
}

function compare(plaintext, hash) {
    return bcrypt.compare(plaintext, hash);
}

function generateSessionId() {
    return crypto.randomBytes(255).toString('base64');
}

module.exports = { hash, compare, generateSessionId };