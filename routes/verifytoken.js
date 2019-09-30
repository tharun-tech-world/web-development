const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){

    const jwttoken = req.header('auth0-token');
    if(!jwttoken) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(jwttoken, process.env.SECRET);
        req.user = verified;
        next();

    }
    catch(error){
        res.status(400).send('Invalid Token');
    }
}
