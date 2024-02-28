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

