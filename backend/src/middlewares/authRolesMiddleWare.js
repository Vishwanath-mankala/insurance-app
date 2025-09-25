
export const authRoles = (...roles) =>{
    return (req,res,next)=>{
        try{
            const user = req.user;
            const role = req.user.role;
            if(!user){
                return res.status(401).json({message:"Unauthorized access"});
            }
            if(!roles.includes(role)){
                return res.status(403).json({message:"Forbidden: You don't have enough permission to access this resource"});
            }
            next();
        }
        catch(error){
            return res.status(500).json({message:`Internal server error: ${error.message}`});
        }
    }
}