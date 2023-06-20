import jwt from "jsonwebtoken";
export const verifyToken = (request,response,next)=>{
    let token = request.headers.authorization;
    try{
        if(!token)
        throw new Error();
       jwt.verify(token,"abcd");
       next();
    }
    catch(err){
        return response.status(401).json({error: "Unauthorized request", status: false});   
    }
}