const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;

//Middlewares
app.use(express.urlencoded({extended:false}));



//Routes
app.get('/users', (req, res)=>{
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    <ul>
    `
    res.send(html)
})

//REST Api

app.get('/api/users', (req, res)=>{
    
    console.log(req.headers)
    return res.json(users);
})

app.route('/api/users/:id').get((req, res)=>{
    
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);

    // 500 server error
    // const user = users.find(user => user[0].id === id);

    //If user not found - 404
    if(!user) return req.status(404).json({error : 'User Not found'});
    return res.json(user);

})

app.post('/api/users' , (req , res)=>{
    // TODO : Create new user

    const  body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: 'ALl fields are required'});
    }

    users.push({...body , id:users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err , data)=>{
        return res.json({status:"pending"});
    })

    //Status code 201
    return res.status(201).json({status: "sucess", id:users.length});
});


app.listen(PORT , ()=>{
    console.log(`Server started at Port ${PORT}`)
})