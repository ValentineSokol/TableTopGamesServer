const Session = require('../db/models/Sessions');

const LoginMiddleware = async (req, res, next) => {
    const { sid } = req.signedCookies;
    const session = await Session.findOne({ sid }).populate('user');
    if (!session) {
        return res.sendStatus(401);
    }
    console.log({ user: session.user });
    req.user = session.user;
    next();
}

module.exports = LoginMiddleware;