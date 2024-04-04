const path = require("path");
const express = require('express')
const multer  = require('multer')

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended:false}))//helps to pass form data

const storage = multer.diskStorage({
    destination:function(req, file , cb){
        return cb(null , "./uploads")
        //       error , foldername
    },
    filename:function(req, file, cb){
        return cb(null , `${Date.now()}-${file.originalname}`)
            //  error       filename
    },
})

const upload = multer({storage:storage});

app.set("view engine","ejs")
app.set("views",path.resolve("./views"));

app.get('/',(req,res)=>{
    return res.render("homepage")
})

app.post('/upload',upload.single("profileImage"),(req,res)=>{
    console.log(req.body); //no text field -> Null
    console.log(req.file);

    return res.redirect("/");
})
app.listen(PORT,()=>{
    console.log(`Server started at PORT:${PORT}`);
})