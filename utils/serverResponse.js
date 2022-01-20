function sendResponse({ code, msg, data = {}, response, status }) {
    return response.code(code).send({ statusCode: code, message: msg, data: data, status });
}

exports.sendSuccessResponse = function sendSuccessResponse({ code = 200, msg, data = {}, response }) {
    return sendResponse({ response, code, msg, data, status: true });
};

exports.sendErrorResponse = function sendErrorResponse({ code = 500, msg, data = {}, response }) {
    return sendResponse({ response, code, msg, data, status: false });
};

exports.sendResponse = sendResponse;
