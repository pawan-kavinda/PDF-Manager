const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const dbURI = process.env.MONGO_URL;

const dbConnection=()=>{
    mongoose.connect(dbURI).then(()=>{
        console.log("Successfully connected to database");
    }).catch((error)=>{
        console.log('Error: '+error.message)
    })
}

module.exports = dbConnection;