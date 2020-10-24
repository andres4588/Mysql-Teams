import { NextFunction, Response, Request } from 'express';
const jwt = require('jwt-simple');
const moment =require('moment');


export const checkToken = (req:Request, res:Response, next:NextFunction)=>{
    if(!req.header('user_token'))
    return res.json({
        error: "You must include the header"
    })

    const token= req.headers['user_token'];
    let payload=null;
    try {
        payload= jwt.decode(token, process.env.TOKEN_KEY)
    } catch (error) {
        return res.json({
            error: 'invalid token'
        })
    }
    if(moment().unix()> payload.expiredAt){
        return res.json({error: 'Expired token'})

    }

    req.userId= payload.userId;
    next();
}

