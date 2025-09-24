import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1]
    if (token) {
        try {
            const userInToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = userInToken
        }catch (err){
            req.user = null
        }
    } else {
        req.user = null
    }
    if(next) next();
       
}