const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;

//Middlewares
app.use(express.urlencoded({extended:false}));

app.use((req , res , next) =>{

    console.log("Hello from middleware 1");
    // return res.json({msg:"Hello from middleware 1"});
    
    req.myUserName= "ayush.dev";
    fs.appendFile('log.txt', `${Date.now()} : ${req.ip}  ${req.method} : ${req.path} \n` ,(err , data)=>{
        next();
    })
    
    
})

app.use((req , res , next)=>{
    console.log("Hello from middleware 2" , req.myUserName);

    //return statement stops the execution
    // return res.end("Hey");

    next();
});

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
    
    console.log(" I am in get route ", req.myUserName)
    return res.json(users);
})

app.route('/api/users/:id').get((req, res)=>{
    
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);

})
.patch((req, res) =>{
    // TODO : edit the user with id
    return res.json({status : 'Pending'})
})
.delete((req , res)=>{
    // TODO : delete the user with id
    res.json({status : 'Pending'})
})



app.post('/api/users' , (req , res)=>{
    // TODO : Create new user
    const  body = req.body;
    users.push({...body , id:users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err , data)=>{
        return res.json({status:"pending"});
    })
    console.log(body);
    return res.json({status: "sucess", id:users.length});
});


app.listen(PORT , ()=>{
    console.log(`Server started at Port ${PORT}`)
})