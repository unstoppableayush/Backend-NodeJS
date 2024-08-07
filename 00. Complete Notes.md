Javascript code executes inside browser.

Browser has javascript engine which executes the javascript code.

Javascript Engine presents only inside Browser.

Each broswer has different Javascript engines. 

```
Chrome -> V8 Engine
Fierfox -> Spider Monkey
Safari -> Nitro 
```

The most populor engine is V8 engine.

A scientist Ryan Dahl taken the V8 engine and embedded with C++ code.And named this project as `NodeJS`.

Now In NodeJS (Benefit)
---

- You can run JS outside of the browser.
- Javascript can talk to native machine beacause of C++.
- You can create webservers in Javascript language.

## What is NodeJS?

NodeJs is neither a framework or language . NodeJS is a Runtime Environment for javascript.

Ex: 
```javascript
PS C:\Users\ayush> node
Welcome to Node.js v20.10.0.
Type ".help" for more information.
> console.log("Hello");
Hello
undefined
> 2+2
4
>

```

# Steps to Install NodeJS

1. Go to official website `nodejs.org`

2. Select LTS Version of NodeJS. <br/>
    <b>LTS</b> - Long Term Support , Start with even number (Stable realese - can be used in production) 

   <b>Beta(Current)</b> - Bugs , Unstability , start with odd number

3. Intall in your local computer and add the path `C:\Program Files\nodejs` to your environment variable.

4. Open Terminal and write command

    ```javascript
    PS C:\Users\ayush> node --version
    v20.10.0
    PS C:\Users\ayush>
    ```

5. If giving this output then NodeJS Installed Succesfully.

# What is npm ?

NPM -> Node Package Manager. We can manage package through it.

# Modules in Nodejs

```javascript
/**
 * Split your code into different files and folders.
 * All maths related function will be written in math.js
 * 
 * To use the math.js file in other file
 * --------------------------------------
 * use require -> const name = require('filename')
 * 
 */

const buffer = require('buffer') // built in package

const math = require('./math')

//De-structuring -> we can directlly use add and sub function
const {add , sub  } = require('./math')

console.log("Math Add value is : ",math.add(2 , 4));
console.log("Math Subtract value is : ",math.sub(2 , 4));

console.log("\nUsing destructured function \n")

console.log("Math Add value is : ",add(2 , 4));
console.log("Math Subtract value is : ",sub(2 , 4));


function add(a , b){
    return a + b
}

function sub(a , b){
    return a - b;
}

// module.exports = add;
// module.exports = sub ; // overiding the value

// we can use object to export multiple values



// multi exports
module.exports = {
    add ,
    sub,
}


//exporting anonymous function
// exports.add = (a , b) => a + b;

// exports.sub = ( a , b) => a - b;
```

# File Handline 

```javascript
const fs = require('fs')

//used this fs module to intract with files

//creating a file (Synchronous call)
// fs.writeFileSync("./test.txt" , 'Hey There');

//Async
// fs.writeFile("./test.txt" , "Hello World", (err) => {})


//Reading the file

// Sync.. -> returns the result
// const result = fs.readFileSync("./contacts.txt" , "utf-8");
// console.log(result);

//Async.. -> return nothing , we have to pass a callback 
// fs.readFile("./contacts.txt" , "utf-8" , (err , result)=>{
//     if(err){
//         console.log("Error",err);
//     }else{
//         console.log(result);
//     }
// });


// Appending the text
// fs.appendFileSync("./test.txt" , "\nHey there I am appended");


// Copy the file
// fs.cpSync("./test.txt" , "./copy.txt");

// Delete the file
// fs.unlinkSync("./copy.txt");

// Cheking status of file
// console.log(fs.statSync("./test.txt"));

//making directory
// fs.mkdirSync("my-docs");
fs.mkdirSync("my-docs/a/b" , { recursive:true});


```
# How Nodejs Works

```
Client ----------> Server
         Request    (NodeJs)
```

Request made to server. Node js has event queue. 

Firstly requests are queued into event queue . 

Now even loop is a machine which always watches the event queue. 

If event loop get any request in event queue the select that request using fifo(first in first out) principle.

Request can be of two types :
  
  1. Blocking Operations (Sync.. task)
  3. Non- Blockinng Operations (Async.. task)

If the request has `non-blocking operation` then the server process it and sends the response back to the user.

![non-blocking operation in nodejs](./non-blocking.png)

If the request has `blocking operation` then to resolve this request it goes to thread pool. 

Thread pool is a pool of threads . Threads act a worker which work for you . It is resposible for fuilful your blocking operation. If the works completes then it return the result . Then the respose is send back to the user . 

![non-blocking operation in nodejs](./blocking.png)


# Building Http Server

```javascript

const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req , res)=>{

    const log = `${Date.now()} : ${req.url} : New Request Recieved \n`;
    fs.appendFile('log.txt' , log , (err , data)=>{

        switch(req.url){
            case '/' : res.end("Home Page");
            break;

            case '/about' : res.end("I am Ayush");
            break;

            default:
                res.end("404 Not Found")

        }
        
        
    })


    // console.log(req.headers)
    // console.log(req)
    

});

const PORT = 8000;
myServer.listen(8000, ()=>{
    console.log(`Server started at port no ${PORT} `);
})

```

# Handling URL

## URL 
Uniform Resource Locator

```
https:// www.ayush.dev/
-------- --------------
Protocol  Domain - User friendly name
            of IP Address of My Server

 dev/ -> Path
 ayush.dev/project/1 -> Nested Path

 ayush.dev/about?userID=1&a=2 -> Query parameter

```

Protocol: Set of rules that tells browser how to communicate to the browser.

https -> Hypertext Transfer Protocol Secure


# Http Methods

# HTTP Methods
```
    GET -> When you want to get some data from the server.

    POST -> When you want to send and mutate some data in server.

    PUT  
    PATCH
    DELETE
```

```javascript
const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req , res)=>{

    if(req.url === '/favicon.ico') return res.end();


    const log = `${Date.now()} : ${req.url} : New Request Recieved \n`;
    const myUrl = url.parse(req.url , true);
    console.log(myUrl);

    fs.appendFile('log.txt' , log , (err , data)=>{

        switch(myUrl.pathname){

            case '/' : 

            if(req.method == 'GET') res.end("Home Page");
            break;

            case '/about' : 
            //query parameter
            const username = myUrl.query.myname ;
            console.log(username)
            res.end(`Hii,  ${username}`);
            break;

            case "/search":
                const search = myUrl.query.search_query;
                console.log(search)
                res.end("Here are your result for "+search);
                break;

            case '/signup':

                if(req.method == 'GET') res.end("This is a signup From");
                else if(req.method == "POST"){
                    //DB Query
                    res.end("Success");
                }
                break;
            default:
                res.end("404 Not Found")

        }
        
        
    })


    // console.log(req.headers)
    // console.log(req)
    

});

const PORT = 8000;
myServer.listen(8000, ()=>{
    console.log(`Server started at port no ${PORT} `);
})


```

# Getting Started with express

```javascript
const express = require("express")

const app = express();

app.get('/',(req , res)=>{
    return res.send("Hello from Home Page")
});

app.get('/about' , (req , res)=>{
    return res.send(`Hello ${req.query.name}`)
})

const PORT = 8000;
app.listen(8000, ()=>{
    console.log(`Server started at port no ${PORT} `);
})

```

# How versioning Works

## Version

4.18.2 

1st Part -> 4
2nd Part -> 18 
3rd Part -> 2  

3rd part(Last Part) - Miner Fixes (Optional)
Latest -> 4.18.3

2nd Part - Recommended Bug Fix (Security)
Latest -> 4.19.1

3rd Part -> Major Realese -> Major / Breaking Update
Latest -> 5.0.1

---

"express": "^4.18.3"

^4.18.3 | ^4.18.3 -> 5.0.0

^4.17.9
^4.18.1
^4.18.2
^4.18.3
..
^5.1.1  ❌

---

~4.18.1
~4.18.2
~4.18.3
~4.18.4

~4.19.1  ❌

# What is Rest Api

# Restfull API Rules

1. Works on server client architecture.

<br/>

![Clinet server architecture](./1.png)

2. Always Respect All Http methods.
    Get , Post , Put , Delete

    Get /user - user data read kro and return kro

    Post /user - handle new user creation

    Pathch /user - Update the user

<br/>

![http methods rule](./2.png)
![http methods rule](./3.png)
![http methods rule](./4.png)



# Bulding Rest Api in Nodejs

# Rest API - JSON

GET /users - HTML Document render - Done
GET /api/users - List all users - Done

GET /api/users/1 - Get the user with ID 1 - Done
GET /api/users/2 - Get the user with ID 2 - Done

Dynamic Path Parameter
GET /api/user/:id 
:id -> Variable | Dynamic - Done

POST /api/users - Create new user

PATCH /api/users/1 - Edit the user with ID 1

DELETE /api/users/1 - Delete the user with ID 1

```javascript
const express = require("express");
const users = require("./MOCK_DATA.json")

const app = express();
const PORT = 8000;

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



// app.post('/api/users' , (req , res)=>{
//     // TODO : Create new user
//     return res.json({status: "pending"});
// })

// app.patch('/api/users/:id' , (req , res)=>{
//     // TODO : Edit the user with id
//     return res.json({status: "pending"});
// })

// app.delete('/api/users/:id' , (req , res)=>{
//     // TODO : delete the user with id
//     return res.json({status: "pending"});
// })

app.listen(PORT , ()=>{
    console.log(`Server started at Port ${PORT}`)
})
```

# Intro to Postman for REST Api

```javascript
const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require("fs")

const app = express();
const PORT = 8000;

//Middleware - Plugin
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

// app.patch('/api/users/:id' , (req , res)=>{
//     // TODO : Edit the user with id
//     return res.json({status: "pending"});
// })

// app.delete('/api/users/:id' , (req , res)=>{
//     // TODO : delete the user with id
//     return res.json({status: "pending"});
// })

app.listen(PORT , ()=>{
    console.log(`Server started at Port ${PORT}`)
})
```

# Express Middleware

## What is middleware?

`Middleware` functions are functions that have access to the request object(req) , the response object(res), and the next middleware function in the application's requests-response cycle. 

The next middleware function commanly denoted by variable `next`.

### Middleware functions can perform:

* Execute any code.
* Make changes to the request and the response objects.
* End the request-response cycle.
* Call the next middleware function in the stack.

If the current middleware is not functioning then it must call next middle ware otherwise request will be left hanging.

```javascript
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
```

# What is Http Header

# What are http Headers in API ?

An HTTP header is a feild of an HTTP request or response that passes additional contex and metadata about the request or respose.

![about header](./img1.png)

![about header](./img2.png)

```javascript
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
    // res.setHeader("myName", "Ayush Kumar");
    res.setHeader("X-MyName", "Ayush Kumar"); //Custom header
    //Always add X to custum headers
    console.log(req.headers)
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
```

# Http Status Code

```javascript
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
```
# Getting Started With MongoDB

# MongoDB

No-SQL Document Based Database.

Strong Support for Aggregation Pipes.

Works on BSON format.

Best for Node Applications.

# Commands

```
> show dbs            
> use <db_name>        
> show collections      
> db.coll.find()
> db.coll.insert()

```

# Connecting MongoDB and Nodejs

# Mongoose

1. Schema - Define the Structure
    Schema - Model
    Using Model we do CRUD Operation

```javascript
const express = require("express");
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

//Connection
mongoose.connect('mongodb://127.0.0.1:27017/learning')
.then(()=> console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error" , err));

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required : true,
    },
    lastName : {
        type: String,
    },
    email:{
        type: String,
        required : true,
        unique: true,
    },
    jobTitle: {
        type: String,
    }
},
{timestamps: true}
)

// Model
const User = mongoose.model('user' , userSchema);

//Middlewares
app.use(express.urlencoded({extended:false}));



//Routes
app.get('/users', async(req, res)=>{

    const allDbUsers = await User.find({});

    const html = `
    <ul>
    ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    <ul>
    `
    res.send(html)
})

//REST Api

app.get('/api/users', async(req, res)=>{

    const allDbUsers = await User .find({});
    return res.json(allDbUsers);

})

app.
route('/api/users/:id')
.get( async(req, res)=>{
    
    const user = await User.findById(req.params.id)
    if(!user) return req.status(404).json({error : 'User Not found'});
    return res.json(user);

})
.patch(async (req,res) =>{
  await User.findByIdAndUpdate(req.params.id ,{ lastName:"Changed" } );
    return res.json({status : "Success"});
})
.delete( async(req , res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status : "Success"});
})

app.post('/api/users' , async(req , res)=>{
    // TODO : Create new user

    const  body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: 'ALl fields are required'});
    }


    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        email: body.email,
        gender : body.gender,
        jobTitle: body.job_title
    });

    console.log("result" , result);

    return res.status(201).json({msg: "Success"})
});


app.listen(PORT , ()=>{
    console.log(`Server started at Port ${PORT}`)
})
```

# Models View Controller

# Model View Controller
```
    Model View Controller
   ------------------------
          Model
          /   \ 
        /       \
      View     Contoller

```


# Custom URL Shortner

# Server Side Rendering With EJS

# Building Nodejs Authentication 

# Authentication

## Authentication Patterns
1. Statefull - Which maintains state or data on server side

2. Stateless - Which has no state.

In statefull authentication server works as a parking boy which stores the car no. with a unique mapped no.

Server gives the mapped number gives to the user as a parking ticket .

When user visit again to take the car the parking boy (server) maps the data , the user is authentic or not . If yes then server gives the permission to user to take the car.(maintain a state)


![statefull authentication](./images/stateful.png)

## How to transfer uid?

Server can transfer the unique id using cookies, respose , headers to the cilent.

## Express Flow

![express flow works](./images/expressflow.png)


# JWT Authentication

## Problems in Statefull Authentication

=> If server restart or some reason server lost , all users get logged out.

=> Memory intensive

## Stateless Authentication

=> No states
=> We use JWT(JSON Web Tokens) Tokens 
=> Maintain the state on local browser using encoded msg of payload(token) and secret key.
=> Secret should be secret.

# Cookies in Nodejs

# Cookies in NodeJS

Server make the token.

Server can the send the token to the user through `Cookies` and `Response`.

## Using Browser - auto
Browser stores the cookies.

We can use the cookie to validate the user.

The server makes the cookies for the domain to which those cookies belong.(Cookies are domain specific.)

We can specify domain to the cookie.Which domain can acess that cookie.

We can also specify the expiration of the cookie.

```javascript 
res.cookie("uid", token , {
    domain : "ayushk.dev" // ayushk.dev can access 

    domain : ".ayushk.dev" // blog.ayushk.dev can access 
    //app.ayushk.dev also can access
    
})
```

It is only limited to the browser.

## Using Header - json

Bearer authentication is also called as token authentication. 
It is an `HTTP auth`.

```javascript
 Header{
    Authorization : Bearer <token>
 }

```

Server reads the header and removes the bearer and takes the token to validate the user.


# Authorization

Authorization is the process of giving someone the ability to access a resource.

# Uploading File With Multer

## Uploading Files with NodeJS and Multer

- installed EJS , Express and Multer Packages
- Created a Form in ejs
- Added action="folder" , method+"post" and erictype="multipart/form-data" in form
- A form can have data + files so must use enctype.
- Use middileware `express.urlencoded({}) which helps to parse the form data.
- Using disk storage to get full control on files.
- We can store `req.file.path` to the database to get the files easily.
- We use `upload.single` to upload single image.
- We can use `upload.array` and `upload.fields` to upload multiple files.

# Blogging App

# Blogging App

- `--dev` use to make Development dependency.
- Dev dependency is required only in development enviornment.
- Ex: `npm i nodemon --dev`
- It will not be used in Production enviornment.
- We haave used `Partials` Folder Which includes all the files which are partial for many other files.
- Steps :
    - Created Models
    - Created Views 
    - Created Router to handle request
    - Hashed the password using crypto library
    - Worked on Signup page
    - Worked on Signin page
    - Signup and signin done
    
# Setting up Auth in Nodejs

# Setting up Blogging App

- `--dev` use to make Development dependency.
- Dev dependency is required only in development enviornment.
- Ex: `npm i nodemon --dev`
- It will not be used in Production enviornment.
- We haave used `Partials` Folder Which includes all the files which are partial for many other files.
- Steps :
    - Created Models
    - Created Views 
    - Created Router to handle request
    - Hashed the password using crypto library
    - Worked on Signup page
    - Worked on Signin page
    - Signup and signin done
    

# Authentication 

- Created a JWT Token 
- Creation and valiation of JWT token 
- made payload for valid user
- Saved in localstorage
- Created a middleware to check for authentication cookie
- Installed `cookie-parser` library and used it
- Made a route for clear cookie(logout)
- set the token with full name and displayed the full name at username by me
- created blog schema and model
- Made Blog Router And Schema
- Created a blog page
- Stored the blog in database
- Used multer to store the image 
- Used `express.static(path.resolve('./public')` middleware to get access to static files(blog image)

# Complete Blog App
# Setting up Blogging App

- `--dev` use to make Development dependency.
- Dev dependency is required only in development enviornment.
- Ex: `npm i nodemon --dev`
- It will not be used in Production enviornment.
- We haave used `Partials` Folder Which includes all the files which are partial for many other files.
- Steps :
    - Created Models
    - Created Views 
    - Created Router to handle request
    - Hashed the password using crypto library
    - Worked on Signup page
    - Worked on Signin page
    - Signup and signin done
    

# Authentication 

- Created a JWT Token 
- Creation and valiation of JWT token 
- made payload for valid user
- Saved in localstorage
- Created a middleware to check for authentication cookie
- Installed `cookie-parser` library and used it
- Made a route for clear cookie(logout)
- set the token with full name and displayed the full name at username by me
- created blog schema and model
- Made Blog Router And Schema
- Created a blog page
- Stored the blog in database
- Used multer to store the image 
- Used `express.static(path.resolve('./public')` middleware to get access to static files(blog image)

# Deployed Nodejs App in CLoud

## Deploy NodeJS App to Cloud

- We can't set `PORT` for App on the server by own.
- We need a enviournment variable i.e. Dynamic Variable. 
- Enviornment variable is set by cloud.
- `process.env.Variable_Name`
- For cloud sever make sure you have start script `"start": "node app.js"`
- For  Node.js, the main file is typically app.js

# Websocket

# WebSocket

- In general , We send request to the server , server responds to our request and request-response cycle will be closed.
- Communication is single direction. Client request then Server responds (req-res cycle closed)

- Problem :
    - Everytime when user request to the server there is message is available or not. (Chat App)
    - This is called `Polling`. 
    - If message is not available then we are also reuesting to the server
    - Unneccesarly increasing the load to the server.

- Solution :
    - Clinet sent `HTTP` request and tells , i want to make `WebSocket` connection.
    - `Upgrade` Header upgrades `http` connection to `websocket` connection.
    - any one can send message (server <--> Client) (Bidirectional).
    - You don't close the websocket connection unless you want. 
    - WebSocket is just a `protocol`, provides `full-duplex` communication.
    - We don't need `Polling`.


- We use `Socket.io` Library.


# Scale Nodejs App using Cluster

# Scale NodeJS application using the cluster module

- Multiple users concurrently accesing the server then Workload increases.
- When users increases then we can use clusters.
- We distribute the workload on server into multiple apllication threads of nodejs.
- We can make worker threads as no of cpus. 
- When we use cluster it divides assigns the diifferent work with diffirent threads in nodejs in round robin fashion to distribute the workload. 

# Ngix

# What is Nginx (Engine-X)?

- NGINX is a powerful web server and uses a non-threaded , event-driven architecture.

- It can also do other important things ,such as `load balancing` , and `HTTP caching`, or be used as a `reverse proxy`.

- Forward Proxy
    - When multiple clients connecting to VPN Sever. And VPN sever is connecting to a server.
    - Only one client for server i.e. VPN.

- Reverse Proxy:
    - When a clinet is connecting a VPN server and that vpn is connecting to multiple servers.
    - Users don't know request will be serve to which server.

- Reverse Proxy:
    - Nginx decides your request will be serve to which server.
- Load Balance - distribute the load.
- Http Cache - make cache to reduce req-res cycle.

- Advantage:
    - Can handle 10000 concurrent requests
    - Cache HTTP requests
    - Act as Reverse Proxy
    - Act as Load Balancer
    - Act as an API Gateway
    - Serve and Cache Static files like images, Videos, etc
    - Handle SSL Certificates

- Prerequisite
    - Docker , Basic Linux Commands , Containerization

# GraphQL

# GraphQL 

- It is  Query Language to make api calls.
- Gives clients the power to ask for exactly what they need and nothing more.

## Problem that GraphQL Solves

- When we make an api call it servers all the data of the particular id from database.
- We use the required data and ignore the others data that we don't want to use or show.
- The problem is every time we call api then it serves all the data which is not required.

- To get the only required data from the database we use GraphQL, It serve the only neccessary that user wants.(reduce over-fetching of data)

- `!` used to define required field.


## What is Axios?
- A Javscript library used for making HTTP requests from web browsers and Node.js applications.

- Features : request and response interception, automatic transformation of JSON data, and the ability to cancel requests.


- Code :
    - ```javascript
        const server = new ApolloServer({
        typeDefs: `
            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                phone: String!
                website: String!
            }
            type Todo {
                id: ID!
                title : String!
                completed: Boolean
                user: User
            },

            type Query {
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id: ID!): User
            }

            `,
            resolvers: {
            Todo: {
                user: async(todo) =>  (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
            },
            Query: {
                getTodos: async () =>{
                return (await axios.get("https://jsonplaceholder.typicode.com/todos")).data;
                },
                getAllUsers: async () => {
                return (await axios.get("https://jsonplaceholder.typicode.com/users")).data;
                },
                getUser: async (_, { id }) => {
                return (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data;
                },
            },
            },
        });

       
       ```

    