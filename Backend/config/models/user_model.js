const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required :true
    },
    password:{
        type:String,
        required:true,        
    }
},{timeseries:true})


//sign up operation
userSchema.statics.signUp = async function(email,password,name){
    const existingUser = await this.findOne({email});
    if(existingUser){
        throw Error('Email is already registered')
    }
    const salt = await bcrypt.genSalt(10); // In case of same password of different users
    const hash = await bcrypt.hash(password,salt);
    const newUser = this.create({email,password:hash,name});
    return newUser
}

//sign in operation
userSchema.statics.signIn=async function(email,password){
    const exsistingUser = await this.findOne({email})
    if(!exsistingUser){
        throw Error('User does not exists')
    }
    const match = await bcrypt.compare(password,exsistingUser.password)
    if(!match){
        throw Error('password incorrect')
    }
    return exsistingUser
}



module.exports = mongoose.model('Users',userSchema)