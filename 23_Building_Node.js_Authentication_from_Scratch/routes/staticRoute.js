const express = require('express')
const URL = require('../models/url');
const router = express.Router();


router.get('/' , async(req, res)=>{
    const allUrls = await URL.find({});
    return res.render("home",{
        urls: allUrls,
    })
})


router.get('/signup', async(req , res)=>{
    return res.render("signup");
})

router.get('/login', async(req , res)=>{
    return res.render("login");
})



module.exports = router;