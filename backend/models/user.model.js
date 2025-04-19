const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');





const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'firstname must be of three character'],
        },
        lastname:{
            type:String,
            minlength:[3,'lastname should be of three characer'],

        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'email must be of 5 character'],
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,

    },
})

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword=async function (password){
    return await bcrypt.compare(passord,this.password);
}

userSchema.statics.hashPassword=async function (password){
    return await bcrypt.hash(password,10);
}

const userModel=mongoose.model('user',userSchema);

module.exports=userModel;