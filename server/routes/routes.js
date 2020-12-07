//........Import dependencies........//

const userRouter = require('express').Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

//........END of Import dependencies........//


userRouter.post("/googleLogin", userController.googleLogin);
userRouter.get("/authenticated", auth, userController.isAuthenticated);
userRouter.get("/fetchData", auth, userController.fetchData);
userRouter.get("/logout", userController.logout);

module.exports = userRouter;