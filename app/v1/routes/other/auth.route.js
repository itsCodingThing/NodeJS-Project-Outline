const yup = require("yup");
const AuthController = require("../../controllers/auth.controller");
const { sendErrorResponse } = require("../../../../utils/serverResponse");
const utils = require("../../../../utils/utils");
const message = require("../../../../config/message");

const authRoutes = [
    /**
     * @rotue   POST "/api/v1/auth/login
     * @desc    Login admin user
     */
    {
        method: "POST",
        url: "/auth/login",
        preHandler: async (req, res) => {
            const body = req.body;

            if (!utils.validateField(body.type)) {
                return sendErrorResponse({
                    code: message.user_validation.statusCode,
                    msg: "Missing field type",
                    response: res,
                });
            }

            if (!["admin", "school_admin"].includes(body.type)) {
                return sendErrorResponse({
                    code: message.user_validation.statusCode,
                    msg: "Invalid field type",
                    response: res,
                });
            }

            if (!utils.validateField(body.email)) {
                return sendErrorResponse({
                    code: message.user_validation.statusCode,
                    msg: message.user_validation.email,
                    response: res,
                });
            }

            if (!utils.validateField(body.password)) {
                return sendErrorResponse({
                    code: message.user_validation.statusCode,
                    msg: message.user_validation.password,
                    response: res,
                });
            }
        },
        handler: AuthController.login,
    },

    /**
     * @route  POST "/api/v1/auth/app/login"
     * @desc   App user login
     */
    {
        method: "POST",
        url: "/auth/app/login",
        preHandler: async (req, res) => {
            const check = yup.object({
                code: yup.string().required(),
                type: yup.string().required(),
                contact: yup.string().required(),
            });

            if (!check.isValidSync(req.body)) {
                return sendErrorResponse({
                    code: message.master_validation.status_code,
                    msg: message.master_validation.check_json_body,
                    response: res,
                });
            }

            const body = req.body;

            if (!["teacher", "student"].includes(body.type)) {
                return sendErrorResponse({
                    code: message.master_validation.status_code,
                    msg: message.master_validation.invalid_type,
                    response: res,
                });
            }

            if (body.contact.length !== 10) {
                return sendErrorResponse({
                    code: message.user_validation.status_code,
                    msg: message.user_validation.invalid_mobile,
                    response: res,
                });
            }
        },
        handler: AuthController.appLogin,
    },

    /**
     * @route  POST "/api/v1/auth/app/verify"
     * @desc   App user otp verify
     */
    {
        method: "POST",
        url: "/auth/app/verify",
        preHandler: async (req, res) => {
            const check = yup.object({
                otp: yup.string().required(),
                id: yup.string().required(),
                type: yup.string().required(),
            });

            if (!check.isValidSync(req.body)) {
                return sendErrorResponse({
                    code: message.master_validation.status_code,
                    msg: message.master_validation.check_json_body,
                    response: res,
                });
            }

            const body = req.body;
            if (!["teacher", "student"].includes(body.type)) {
                return sendErrorResponse({
                    code: message.master_validation.status_code,
                    msg: message.master_validation.invalid_type,
                    response: res,
                });
            }
        },
        handler: AuthController.appVerifyOtp,
    },

    /**
     * @route  POST "/api/v1/auth/app/refresh"
     * @desc   App user refresh token
     */
    {
        method: "POST",
        url: "/auth/app/refresh",
        preHandler: async (req, res) => {
            const check = yup.object({
                school_id: yup.string().required(),
                user_id: yup.string().required(),
                device_id: yup.string().required(),
                type: yup.string().required(),
            });

            if (!check.isValidSync(req.body)) {
                return sendErrorResponse({
                    code: message.master_validation.status_code,
                    msg: message.master_validation.check_json_body,
                    response: res,
                });
            }

            if (!utils.validMongodbObjectId(req.body.user_id)) {
                return sendErrorResponse({
                    code: message.master_validation.status_code,
                    msg: message.master_validation.invalid_mongodb_id,
                    response: res,
                });
            }

            if (!["teacher", "student"].includes(req.body.type)) {
                return sendErrorResponse({
                    code: message.master_validation.status_code,
                    msg: message.master_validation.invalid_type,
                    response: res,
                });
            }
        },
        handler: AuthController.refreshAppToken,
    },

    /**
     * @rotue   POST "/api/v1/auth/register"
     * @desc    Register admin user
     */
    {
        method: "POST",
        url: "/auth/register",
        preHandler: async (req, res) => {
            const body = req.body;

            if (!utils.validateField(body.email)) {
                return sendErrorResponse({
                    code: message.user_validation.statusCode,
                    msg: message.user_validation.email,
                    response: res,
                });
            }

            if (!utils.validateField(body.password)) {
                return sendErrorResponse({
                    code: message.user_validation.statusCode,
                    msg: message.user_validation.password,
                    response: res,
                });
            }
        },
        handler: AuthController.register,
    },
];

module.exports = authRoutes;
