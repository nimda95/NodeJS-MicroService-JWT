var jwt = require('jsonwebtoken');
module.exports = {
    ensureAuthenticated: (req, res, next) => {
        try{
            var decodedUserData = jwt.verify(req.params.token, "//process.env.JWT_SECRET");
            req.userData = decodedUserData;
            next();
        }catch(e){
            return res.send("invalid token");
        }
    }
};