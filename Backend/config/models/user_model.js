const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { off } = require('./pdf_model')
const validator = require('validator')
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

    //validation
    if(!email || !password){
        throw Error("All field must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Email must be Valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough use Uppercase letters, Lowercase letters, Numbers and characters")
    }
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
        throw Error('Incorrect Password! Try again')
    }
    return exsistingUser
}



module.exports = mongoose.model('Users',userSchema)