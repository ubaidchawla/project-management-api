const expressJwt = require('express-jwt');
const user= require('../controllers/users');

module.exports = jwt;

function jwt() {
    const secret = process.env.JWTSECRET;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/signup',
            '/users/signin'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await user.findById(payload.userId);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};
