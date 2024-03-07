const express = require("express");

const {connectMongoDb} = require('./connection')
const {logReqRes} = require('./middlewares')
const userRouter = require('./routes/user')

const app = express();
const PORT = 8000;

//Connection
connectMongoDb('mongodb://127.0.0.1:27017/learning')
.then(()=> console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error" , err));


//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));

//Route
//express will match /api/users path and next path will give to the userRouter
app.use("/api/users" , userRouter)

app.listen(PORT , ()=>{
    console.log(`Server started at Port ${PORT}`)
})