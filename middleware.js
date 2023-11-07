let jwt = require('jsonwebtoken');
const userController = require('./controllers/users');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token == null) {
        return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    token = token.replace("Token ", "");
    if (token) {
        jwt.verify(token, '555e7c89e063d6a514433973078560c7', (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.token = token;
                console.log(decoded);
                const user = userController.findById(decoded.userId);
                    // append the user object the the request object
                if(user){
                    req.user = user;
                    req.userId = user._id;
                    next();
                }else{
                    return res.status(401).json({
                        success: false,
                        message: 'Token user not found'
                    });
                }
        
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {checkToken}
