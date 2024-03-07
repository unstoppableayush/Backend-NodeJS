const fs = require('fs');

function logReqRes(filename){
     return (req , res , next) =>{
        fs.appendFile(
          filename,
          `${Date.now()} : ${req.ip} &{req.mentod} : ${req.path}\n`,
          (err , data) =>{
               next();
          }
        );
     }
}

module.exports = {
     logReqRes,
};