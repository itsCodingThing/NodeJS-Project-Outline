const mongoose = require("mongoose");

const logger = require("../utils/logger");
const { sendErrorResponse } = require("./serverResponse.js");

class CustomError extends Error {
    constructor({ name = "", status = false, msg = "", error, code = 500 }) {
        super(msg);
        this.status = status;
        this.msg = msg;
        this.name = name;
        this.error = error;
        this.code = code;

        Error.captureStackTrace(this);
    }
}

function errorHandler(error, _req, res) {
    if (error instanceof CustomError) {
        return sendErrorResponse({ code: error.code, msg: error.msg, response: res });
    }

    console.log(error.message);
    if (error instanceof mongoose.Error.CastError || error instanceof mongoose.Error.ValidationError) {
        logger.error("errorHandler", "errorHandler", error);
        return sendErrorResponse({ msg: error.message, response: res });
    }

    // if (error instanceof mongoose.Error) {
    //     logger.error("errorHandler", "errorHandler", error);
    //     return sendErrorResponse({ msg: error.name, response: res, data: error.toString() });
    // }

    logger.error("errorHandler", "errorHandler", error);
    return sendErrorResponse({ msg: "Internal Server Error", data: error.toString(), response: res });
}

module.exports = { errorHandler, CustomError };
