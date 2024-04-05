const express = require('express');
const path = require('path');    
const ejs = require('ejs')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

mongoose.connect('mongodb://127.0.0.1:27017/blogify')
.then((e)=> console.log("MongoDB Connected"))

const Blog = require('./models/blog')

const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')

const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const app = express();
const PORT = 800;

app.set("view engine","ejs")
app.set("views", path.resolve( "views"));

//middleware
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))

app.get('/',async(req,res)=>{
    const allBlogs = await Blog.find({});
    return res.render('home',{
        user: req.user,
        blogs: allBlogs
    });
})

app.use('/user',userRoute) 
// If any request start with /user then use `userRoute`
app.use('/blog',blogRoute) 




app.listen(PORT , ()=>console.log(`Server started at PORT:${PORT}`));

