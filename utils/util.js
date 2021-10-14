const message = require('../config/message');
const config = require('../config/config');
const crypto = require('crypto');
const logger = require("../helpers/logger").Logger;

const moduleName = "util";

exports.encryptPassword = (paramPassword) => {
    /** password encryption */
    const password = config.encrypt.salt + paramPassword;
    /** Generate password hash */
    const hash = crypto.createHash(config.encrypt.algorithm);
    /** Hashing algorithm sha1 */
    hash.update(password);
    return hash.digest(config.encrypt.digest);
};

//send response with custom message and status code
exports.sendResponse = (statusCode, message, recordCount, data, reply) => {
    const response = {
        "statusCode": statusCode,
        "recordCount": recordCount,
        "message": message,
        "body": data,
    };
    reply.send(response)
};

//send response with static message and status code 
exports.sendSuccessResponse = (recordCount, data, reply) => {
    const response = {
        "statusCode": message.success.statusCode,
        "message": message.success.message,
        "recordCount": recordCount,
        "body": data,
    };
    reply.send(response)
};
exports.sendErrorResponse = (statusCode, message, reply) => {

    logger.error(moduleName, "sendAndWriteErrorResponse", message);
    var err = new Error();
    err.statusCode = statusCode;
    err.message = message;
    err.statusText = message;
    reply.status(statusCode).send(err);
};

//send error response with message and status code and save to logs
exports.sendAndWriteErrorResponse = (err, reply) => {
    logger.error(moduleName, "sendAndWriteErrorResponse", err);
    reply.status(err.statusCode).send(err);
};


//Validate filed value
exports.validateField = (params) => {
    if (params != null && params != '' && params.trim() != '') {
        return true;
    } else {
        return false;
    }
};

//Validate filed value
exports.validateArray = (params) => {
    if (params != null && params != '' && typeof params == "object") {
        return true;
    } else {
        return false;
    }
};

//Validate filed value
exports.validateObject = (params) => {
    if (params != null && params != '' && typeof params == "object") {
        return true;
    } else {
        return false;
    }
};

//Validate numeric and decimal values
exports.validateNumericField = (params) => {
    if (params != null && params != '' && params != 0 && !isNaN(params)) {
        return true;
    } else {
        return false;
    }
};


//Validate numeric and decimal values
exports.generateRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};