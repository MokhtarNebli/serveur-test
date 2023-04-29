const jwt = require('jsonwebtoken')

 exports.authMidedleware = async (req , res, next) => {
    try {
        const token = req.headers.token;
        console.log(token);
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        req.personId = verifyToken.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:'something went wrong !'});
    }
};