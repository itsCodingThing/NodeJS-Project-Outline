const jwt = require("../utils/jwt");
const message = require("../config/message");
const { sendErrorResponse } = require("../utils/serverResponse");

module.exports = async (req, res) => {
    // check token if available
    const token = req.headers.authorization && req.headers.authorization !== "";
    if (!token) {
        return sendErrorResponse({
            msg: message.unAuthorizeToken.message,
            code: message.unAuthorizeToken.status_code,
            response: res,
        });
    }

    // check payload
    try {
        const payload = jwt.verifyJWT(req.headers.authorization.split(" ")[1]);
        req.payload = payload;

        return;
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return sendErrorResponse({
                msg: message.unAuthorizeToken.token_expired,
                code: message.unAuthorizeToken.status_code,
                response: res,
            });
        }

        return sendErrorResponse({
            msg: message.unAuthorizeToken.message,
            code: message.unAuthorizeToken.status_code,
            response: res,
        });
    }
};
