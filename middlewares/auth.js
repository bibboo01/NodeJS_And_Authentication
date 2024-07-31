const jwt = require('jsonwebtoken');

function authenticateToken(req,res){
    const authHeader = req.authHeader["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) return res.sendstatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendstatus(403).send("Access token expired");
        req.user = user;
        next();
    })
}
module.exports = authenticateToken;