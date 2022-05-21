const express = require('express');
const bodyParser = require('body-parser').json;
const cookieParser = require('cookie-parser');
const db = require('./db');
const errorCodes = require('./constants/errorCodes');
const PasswordUtils = require('./utils/password');
const User = require('./db/models/User');
const Session = require('./db/models/Sessions');
const cookieConstants = require('./constants/cookie');
const LoginMiddleware = require('./middleware/login');

const app = express();

app.use(bodyParser());
app.use(cookieParser('secret'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port: ${port}!`));

db.connect();

app.post('/users', async (req, res) => {
    const { username, password } = req.body;
    const usersWithUsername = await User.find({ username });
    if (usersWithUsername.length) {
        res.status(400).json({ error: errorCodes.USERNAME_TAKEN });
        return;
    }
    const passwordHash = await PasswordUtils.hash(password);
    const user = await User.create({ username, password: passwordHash });
    res.status(201).json({ _id: user._id })
});

app.post('/login', async (req, res) => {
   const { username, password } = req.body;
    const [user] = await User.find({ username });
    if (!user) {
        res.status(404).json({ error: errorCodes.NO_SUCH_USER_FOUND });
        return;
    }
    const passwordsMatch = PasswordUtils.compare(password, user.password);

    if (!passwordsMatch) {
        res.status(400).json({ error: errorCodes.INVALID_CREDENTIALS });
        return;
    }
    const session = await Session.create({
        sid: PasswordUtils.generateSessionId(),
        user: user._id
    });

    res.cookie('sid', session.sid, { httpOnly: true, maxAge: cookieConstants.SESSION_MAX_AGE });
    res.status(200).json({ username: user.username });
});

app.get('/protected', LoginMiddleware, (req, res) => res.send('test'));