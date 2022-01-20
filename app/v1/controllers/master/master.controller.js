const SchoolService = require("../../../../services/db/school.service");
const messages = require("../../../../config/message");
const FcmService = require("../../../../services/fcm.service");
const { sendSuccessResponse, sendErrorResponse } = require("../../../../utils/serverResponse");

/**
 * @rotue   GET "/api/v1/code/:code"
 * @desc    Verify school code
 */
exports.verifySchoolCode = async (req, res) => {
    const params = req.params;

    const school = await SchoolService.getSchoolByCode(params.code);

    if (!school) {
        return sendErrorResponse({
            code: messages.master_validation.status_code,
            msg: messages.master_validation.invalid_school_code,
            response: res,
        });
    }

    return sendSuccessResponse({ msg: messages.success.message, data: school._id, response: res });
};

/**
 * @rotue   POST "/api/v1/notification"
 * @desc    Trigger notification for fcm_id
 */
exports.triggerNotification = async (req, res) => {
    const body = req.body;

    let id = "";
    try {
        id = await FcmService.sendNotificationWithToken({ message: body.message, fcm_id: body.fcm_id });
    } catch (e) {
        console.log(e);
    }

    return sendSuccessResponse({ msg: messages.success.message, data: id, response: res });
};
