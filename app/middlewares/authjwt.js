const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const db = require('../models');
const User = db.user;


const verifyToken=(req,res,next)=>{
    let token =  req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(403).send({message:'No Token Provided!'})
    }

    jwt.verify(token,
                config.secret,
                (err,decoded)=>{
                    if(err){
                        return res.status(401).send({
                            message: "Unauthorized!",
                          });
                    }
                    req.userId = decoded.id;
                   
                    next();
                }
    )
}

const authJwt = {
    verifyToken,
  };
  module.exports = authJwt;