const jwt = require('../../middleware/jwt');
const authService = require('../services/auth/auth.service');
const utils = require('../../utils/util');
const message = require('../../config/message');
const enums = require('../../utils/enums');

login = async (req, reply) => {
    if (!utils.validateField(req.body.email)) {
        utils.sendErrorResponse(message.user_validation.statusCode, message.user_validation.email, reply);
    } else if (!utils.validateField(req.body.password) && !utils.validateField(req.body.google_id) && !utils.validateField(req.body.facebook_id)) {
        utils.sendErrorResponse(message.user_validation.statusCode, message.user_validation.password, reply);
    } else {
        authService.login(req.body).then(response => {
            if (response && response.length > 0) {
                const data = response[0];
                if (data.status.toLowerCase() == enums.enmUserStatus.active) {
                    const token = jwt.generateToken({ id: data.id });
                    data["token"] = token;
                    utils.sendSuccessResponse(1, data, reply);
                } else if (data.status.toLowerCase() == enums.enmUserStatus.inactive) {
                    utils.sendErrorResponse(message.login_error.statusCode, message.login_error.inactive_message, reply)
                } else if (data.status.toLowerCase() == enums.enmUserStatus.deleted) {
                    utils.sendErrorResponse(message.login_error.statusCode, message.login_error.deleted_message, reply)
                } else if (data.status.toLowerCase() == enums.enmUserStatus.blocked) {
                    utils.sendErrorResponse(message.login_error.statusCode, message.login_error.blocked_message, reply)
                }
            } else {
                utils.sendErrorResponse(message.login_error.statusCode, message.login_error.message, reply)
            }
        }).catch(err => {
            console.log("Login Error : ", err);
            utils.sendAndWriteErrorResponse(err, reply);
        })
    }
};

register = (req, reply) => {
    if (!utils.validateField(req.body.email)) {
        utils.sendErrorResponse(message.user_validation.statusCode, message.user_validation.email, reply);
    } else if (!utils.validateField(req.body.first_name)) {
        utils.sendErrorResponse(message.user_validation.statusCode, message.user_validation.first_name, reply);
    } else if (!utils.validateField(req.body.last_name)) {
        utils.sendErrorResponse(message.user_validation.statusCode, message.user_validation.last_name, reply);
    } else {
        authService.register(req.body, reply).then(response => {
            if (response && response.length > 0) {
                utils.sendResponse(message.success.statusCode, message.user_validation.register_success, 1, { user_id: response['id'] }, reply);
            } else {
                utils.sendErrorResponse(message.registration_error.statusCode, message.registration_error.message, reply)
            }
        }).catch(err => {
            console.log("Registration Error : ", err);
            utils.sendAndWriteErrorResponse(err, reply);
        })
    }
};

//export functions
module.exports = {
    login,
    register
};
