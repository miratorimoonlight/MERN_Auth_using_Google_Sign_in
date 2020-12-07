//..........Controller handles request response get from route..........//

//.......... Import dependencies ............/

const {google} = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID, 
)
const User = require('../db_model/user_model');
const jwt = require('jsonwebtoken');

//.......... END of Import dependencies ............/



const userController = {
    googleLogin: async (req, res)=> {
        try {
            const {idToken} = req.body;
            const verify = await oauth2Client.verifyIdToken({idToken: idToken, audience: process.env.GOOGLE_CLIENT_ID})
            const {email, email_verified} = verify.payload;

            if(email_verified) {
                const user = await User.findOne({email});

                //..........If there's Existing user...........//
                if(user) {
                    let token = createAccessToken(user._id);
                    res.cookie("access_token", token, {maxAge: 3600*1000, httpOnly: true, sameSite: true});
                    return res.status(200).json( { success: true,  user:{email} })
                }
                //.............Else, Create new user.............//
                else {
                    let password = email+process.env.PASSWORD_SECRET;
                    const newUser = new User({
                        email,
                        password,
                        isVerified: true
                    })
                    await newUser.save();
                    let token = createAccessToken(newUser._id);
                    res.cookie("access_token", token, {maxAge: 3600*1000, httpOnly: true, sameSite: true});
                    return res.status(200).json({ success: true, user:{email} })
                }
            }
            else {
                res.status(400).json({success: false, msg: "Email is not verified, please use a verified account"});
            }
        }
        catch (err) {
            return res.status(500).json({success: false, msg: err.message})
        }   
    },
    isAuthenticated: async (req, res)=> {
        try{
            const user = await User.findById(req.userID);
            if(user) {
                return res.status(200).json({ success: true, isVerified: user.isVerified, user:{email: user.email} })
            }
        }
        catch(err) {
            return res.status(500).json({ success: false, msg: err.message});
        }
        
    },
    fetchData: (req, res)=> {
        return res.status(200).json({success: true, data: "Protected DATA"})
    },
    logout: (req, res)=> {
        res.clearCookie('access_token');
        return res.status(200).json({success: true})
    }
}

module.exports = userController


//...........................................//
function createAccessToken(userID) {
    return jwt.sign(
        {
            iss: 'myServer',
            sub: userID
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    )
}