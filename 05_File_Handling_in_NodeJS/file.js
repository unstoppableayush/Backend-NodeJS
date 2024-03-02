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


