const jwt = require("../utils/jwt");
const jwts = require("jsonwebtoken");
const isAdmin = async (req, res, next) => {

    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Invalid token" });

    jwt.verify(token, (err, data) => {
        if (err) {
            if (err instanceof jwts.JsonWebTokenError) {
                return res.status(401).json({ message: "Invalid Token" });
            } else if (err instanceof jwts.TokenExpiredError) {
                return res.status(403).json({ message: "Token Expired" });
            }
        }
       
        req.verified = data;
    });
    next();
};

module.exports = isAdmin;
