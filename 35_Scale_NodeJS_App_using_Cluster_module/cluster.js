const cluster = require('node:cluster')
const os = require('os')
const express = require('express')

const totalCPUs = os.cpus().length;

// console.log(totalCPUs)

if(cluster.isPrimary){

    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
}
else{
    const app = express();
    const PORT = 8000;

    app.get("/",(req , res)=>{
        return res.json({message: `Hello from Express Server ${process.pid} 🚀`})

    })
    app.listen(PORT, ()=> console.log(`Server Started at PORT: ${PORT}`))

}