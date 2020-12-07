//.........This is authentication middleware - no need to use passport..........//
const jwt = require('jsonwebtoken');


const auth = (req, res, next)=> {
    try {
        const {access_token} = req.cookies;
        const payload = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
        if(payload){
            req.userID = payload.sub;
            next()
        }
        else {
            return res.status(401).json({ success: false, msg: "Unauthorized, please re-login"})
        }
    }
    catch(err) {
        return res.status(500).json({ success: false, msg: err.message})
    }
}

module.exports = auth;