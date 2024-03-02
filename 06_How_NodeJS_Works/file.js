const fs = require('fs')
const os = require('os')

//gives the computer information
console.log(os.cpus().length); 


// Sync.. Blocking ..

console.log("1");

const result = fs.readFileSync('contacts.txt' , 'utf-8');
console.log(result);

console.log("2");


// Async.. Non-Blocking

console.log("\nNon-Blocking(Async) \n")

console.log("1");

fs.readFile('contacts.txt' , 'utf-8' , (err , result)=>{
    console.log(result);
})

console.log("2");
console.log("3");
console.log("4");