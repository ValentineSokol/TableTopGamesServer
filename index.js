const express = require('express');
const bodyParser = require('body-parser').json;
const db = require('./db');

const app = express();

app.use(bodyParser);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port: ${port}!`));

db.connect();