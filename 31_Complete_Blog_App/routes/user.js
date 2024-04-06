const {Router} = require('express');
const User = require('../models/user')
const router = Router();

router.get('/signin',(req,res)=>{
    return res.render("signin")
})
router.get('/signup',(req,res)=>{
    return res.render("signup");
})
router.post('/signup',async (req,res)=>{
    const {fullName , password , email } = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect('/');
})

router.post('/signin',async(req,res)=>{
    const { password , email  } = req.body;
    try {
        const token =await User.matchPasswordAndGenerateToken(email,password);
        console.log("Token",token);
        return res.cookie('token',token).redirect('/');
    } catch (error) {
        return res.render('signin',{
            error:"Incorrect Email or Password",
        });
    }
    

})

router.get('/logout',(req, res)=>{
    res.clearCookie('token').redirect('/');
})
module.exports=router;
