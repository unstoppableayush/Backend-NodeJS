const express = require('express');
const path = require('path');    
const ejs = require('ejs')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/blogify')
.then((e)=> console.log("MongoDB Connected"))

const userRoute = require('./routes/user')
const app = express();
const PORT = 800;

app.set("view engine","ejs")
app.set("views", path.resolve( "views"));

app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    return res.render('home');
})

app.use('/user',userRoute) 
// If any request start with /user then use `userRoute`

app.listen(PORT , ()=>console.log(`Server started at PORT:${PORT}`));

