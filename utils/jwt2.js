const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const config = require("../config/config.json"); // get our config file

// Verify jwt token
function verifyToken(token) {
    // check header or url parameters or post parameters for token
    if (!token) return false;

    const verifyOptions = {
        issuer: config.jwt.issuer,
        subject: config.jwt.subject,
        audience: config.jwt.audience,
        expiresIn: config.jwt.expiresIn,
    };

    // verifies secret and checks exp
    try {
        jwt.verify(token, config.jwt.publicKey, verifyOptions);
        return true;
    } catch (err) {
        return false;
    }
}

// generate jwt token
function generateToken(paramData) {
    const signOptions = {
        issuer: config.jwt.issuer,
        subject: config.jwt.subject,
        audience: config.jwt.audience,
        expiresIn: config.jwt.expiresIn,
    };

    return jwt.sign({ id: paramData.id }, config.jwt.publicKey, signOptions);
}

module.exports = {
    verifyToken,
    generateToken,
};
