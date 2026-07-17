const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Access denied. No token provided. '});
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        return res.status(403).json({message: 'Invalid or Expired Token. '});
    }
};

const checkRole = (... allowedRoles) =>{
    return (req,res,next) => {
        if(!req.user){
            res.status(401).json({message : "Not authenticated"});
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                message: `Access denied. Required role: ${allowedRoles.join(' or ')}. Your role :${user.role}`,
            });
        }
        next();
    };
};

module.exports = {verifyToken,checkRole};