const AuthService = require("../../../services/auth/auth.service");
const DeviceService = require("../../../services/db/device.service");
const OtpService = require("../../../services/otp.service");

const { sendSuccessResponse, sendErrorResponse } = require("../../../utils/serverResponse");
const utils = require("../../../utils/utils");
const jwt = require("../../../utils/jwt");
const message = require("../../../config/message");

/**
 * @route  POST "/api/v1/auth/login"
 * @desc   Login user
 */
exports.login = async (req, res) => {
    const body = req.body;
    req.log.info(body, "Admin data");

    const user = await AuthService.loginUser(body);

    // check if user exists
    if (!user) {
        return sendErrorResponse({ msg: message.admin_user_error.not_found, response: res });
    }

    // check if user password match
    if (!utils.compareHashPassword(req.body.password, user.password)) {
        return sendErrorResponse({ msg: message.admin_user_error.invalid_password, response: res });
    }

    let token;

    if (body.type === "admin") {
        token = jwt.generateJWT({ id: user._id, type: body.type });
    }

    if (body.type === "school_admin") {
        token = jwt.generateJWT({ id: user._id, school: user.school, type: body.type });
    }

    return sendSuccessResponse({ msg: message.success.message, data: { token }, response: res });
};

/**
 * @route  POST "/api/v1/auth/app/login"
 * @desc   App user login
 */
exports.appLogin = async (req, res) => {
    const { code, contact, type } = req.body;
    const result = await AuthService.loginAppUser({ contact, schoolCode: code, type });

    if (!result) {
        return sendErrorResponse({
            msg: message.user_validation.not_found,
            response: res,
        });
    }

    /* send otp method */
    await OtpService.sendOtp(result.contact, result.otp);

    return sendSuccessResponse({
        msg: message.success.message,
        data: result,
        response: res,
    });
};

/**
 * @route  POST "/api/v1/auth/app/verify"
 * @desc   App user otp verify
 */
exports.appVerifyOtp = async (req, res) => {
    const body = req.body;
    const user = await AuthService.verifyOtp({ otp: body.otp, userId: body.id, type: body.type });

    if (!user) {
        return sendErrorResponse({
            msg: message.user_validation.otp_verify,
            response: res,
        });
    }

    const token = jwt.generateJWT({ id: user._id, school: user.school._id, type: body.type });

    return sendSuccessResponse({
        msg: message.master_validation.success_login,
        data: { user, token },
        response: res,
    });
};

/**
 * @route  POST "/api/v1/auth/app/refresh"
 * @desc   App user refresh token
 */
exports.refreshAppToken = async (req, res) => {
    const { user_id, device_id, school_id, type } = req.body;

    const userDeviceDetail = await DeviceService.getUserDeviceDetailByFilter({ user_id, device_id });

    if (!userDeviceDetail) {
        return sendErrorResponse({
            code: message.user_validation.status_code,
            msg: message.user_validation.device_not_found,
            response: res,
        });
    }

    const token = jwt.generateJWT({ id: user_id, school: school_id, type: type });
    return sendSuccessResponse({
        msg: message.success.message,
        data: { token },
        response: res,
    });
};

/**
 * @route  POST "/api/v1/auth/register"
 * @desc   register new user
 */
exports.register = async (req, res) => {
    const user = await AuthService.registerAdminUser(req.body);

    if (!user) {
        return sendErrorResponse({ msg: message.admin_user_error.email_already_exists, response: res });
    }

    return sendSuccessResponse({ msg: message.success.message, data: user, response: res });
};
