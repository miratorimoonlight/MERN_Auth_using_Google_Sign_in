require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/routes');


//.........DB Connection.........//
mongoose.connect("mongodb://localhost:27017/mydb", {useNewUrlParser: true, useUnifiedTopology: true}, ()=> {
    console.log("DB Connected")
})


//..........Middleware..............//
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true  //<----- to make client send cookie to server
    })
)
app.use(cookieParser());   //<----- to read cookie that is sent from client request
app.use(express.json());  
app.use("/user", userRouter)


//..........Run server.............//
app.listen("5000", () => {
    console.log("Server listening on port 5000")
})