import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import HTTP_STATUS from 'http-status-codes'
import dotenv from "dotenv"
dotenv.config()

export const verifyCustomer = (req: Request , res: Response , next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(HTTP_STATUS.UNAUTHORIZED).json({success: false , message:`Access Denied`})
        return
    } 
    
    const token = authHeader.split(' ')[1]
const secret = process.env.CUSTOMER_JWT_SECRET

try {
 // verify token and save customer Id to the verified variable
 //const verified = jwt.verify(token, `${secret}` )
 //req.body.user = verified;

 next()
} catch (error) {
  res.status(401).json({ message: "Access Denied" });
}

}



export const verifyAdminPermission = (permission: string) => {
  return (req: Request , res: Response , next: NextFunction) =>  {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(HTTP_STATUS.UNAUTHORIZED).json({success: false , msg:`Access Denied`})
        throw new Error(`Access Denied!`)
    } 
    
    const token = authHeader.split(' ')[1]
    const secret = process.env.ADMIN_JWT_SECRET
    
    try {
     // verify token and save customer Id to the verified variable
     const user: any = jwt.verify(token, `${secret}` )
     if (user.permissions.indexOf(permission)=== -1) {
      return res.status(401).json({ message: "Forbidden: you don't have neccessary permission to access this route" });
    }
    
     next()
    } catch (error) {
      res.status(401).json({ message: "Access Denied" });
    }
    
    }

}