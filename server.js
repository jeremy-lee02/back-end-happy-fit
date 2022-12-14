const express = require('express')
const cors = require("cors");
const app = express()
const cookieParser = require("cookie-parser");
const exerciseRouter = require('./routes/Exercises')
const nutritionRouter = require('./routes/Nutrition')
const scheduleRouter = require('./routes/Schedule')
const authRouter = require('./routes/User')
const mongoose = require('mongoose');
const BodyParser = require('body-parser')
require('dotenv').config();

app.use(
    cors({
        origin: "*",
    })
)
app.use(express.json())
app.use(BodyParser.json())

app.use('/exercises',exerciseRouter)

app.use('/auth',authRouter)

app.use('/nutrition',nutritionRouter)

app.use('/schedule',scheduleRouter)


try{mongoose.connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=>{
        app.listen(process.env.PORT || 4000, ()=>{
            console.log("Server is running on port 4000!")
        })
        console.log('Connected to DB!')
    })}
catch(err){
    console.log(err)
}

