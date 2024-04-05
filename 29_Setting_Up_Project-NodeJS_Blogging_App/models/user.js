const {Schema,model}= require('mongoose');
const { createHmac ,randomBytes } = require('node:crypto');

const userSchema = new Schema(
{
    fullName:{
        type:'String',
        required : true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    }
    ,
    password:{
        type:String,
        requied:true
    },
    profileImageURL:{
        type:String,
        default:'/images/default.png',
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }
},
{timestamp: true}
); 

//using pre middleware of mangoose
userSchema.pre('save',function(){
    const user = this;
    if(!user.isModified("password")) return;
    const salt = randomBytes(16).toString(); //random string
    const hashedPassword = createHmac('sha256',salt)
    .update(user.password)
    .digest("hex");
    this.salt = salt;
    this.password=hashedPassword;

})

//making function
userSchema.static('matchPassword',async function(email,password){
    const user =await this.findOne({email});
    if(!user) throw new Error('User not found !');

    console.log(user);
    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvideHash = createHmac("sha256",salt)
    .update(password)
    .digest("hex")

    if(hashedPassword !== userProvideHash){
        throw new Error("Incorrect Password!");
    }
    return user; 

})

const User = model('user',userSchema)

module.exports= User;