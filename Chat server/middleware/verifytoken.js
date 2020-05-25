const jwt  = require('jsonwebtoken');
const config = require('config');

module.exports = (req,res,next) =>{
    const token = req.header('x-auth-token');
    // console.log(token);

    if(!token) return res.status(400).json({msg:'No token,autherization denied'});

    try {
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        
        req.userId = decoded.user.id;
        // console.log(req.userId);
        next();
    } catch (err) {
        res.status(401).json({msg:'Token is not valid'});
    }

}