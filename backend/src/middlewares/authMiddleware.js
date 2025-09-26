// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1]
      req.ipAddress = req.ip || req.connection?.remoteAddress;

    if (token) {
        try {
            const userInToken = jwt.verify(token, process.env.SECRET);
            req.user = userInToken
        }catch (err){
            req.user = null
        }
    } else {
        req.user = null
    }
    if(next) next();
};