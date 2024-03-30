//Removing state and importing JWT

const jwt = require("jsonwebtoken");
const secret = "Ayush$123@$"

function setUser( user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
    //assigning user object as a payload
}

function getUser(token){
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
   
}

module.exports={
    setUser,
    getUser
};