const express = require("express")

const app = express()
const PORT = 8000;

app.get("/",(req , res)=>{
    return res.json({message: `Hello from Express Server ${process.pid} 🚀`})

})

app.listen(PORT, ()=> console.log(`Server Started at PORT: ${PORT}`))
