const jwt = require("jsonwebtoken");
require("dotenv/config")
const secretKey = process.env.SECRET_KEY

const sign = (payload) =>
    jwt.sign(payload, secretKey, { expiresIn: "24h" });

const verify = (payload) => jwt.verify(payload, secretKey);

module.exports = {
    sign,
    verify,
};
