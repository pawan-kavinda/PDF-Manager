const jwt = require('jsonwebtoken')
const User = require('../config/models/user_model')
const dotenv = require('dotenv')

dotenv.config()
const requireAuth =async (req,res,next)=>{
    //authentication verify
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: 'You are not authorized'})
    }
    //seperate token from complete header

    const token = authorization.split(' ')[1]
    try {
      const{_id} = jwt.verify(token,process.env.SECRET) //grabs id from token
      req.user = await User.findOne({_id}).select('_id')
      next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error:'request is not authorized'})
    }
}
module.exports = requireAuth