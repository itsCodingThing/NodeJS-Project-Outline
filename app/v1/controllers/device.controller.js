const DeviceService = require("../../../services/db/device.service");
const { sendSuccessResponse } = require("../../../utils/serverResponse");
const message = require("../../../config/message");

/**
 * @route  POST "/api/v1/device"
 * @desc   Add or update device data
 */
exports.addUserDeviceDetail = async (req, res) => {
    const body = req.body;
    const currentUserId = req.payload.id;

    await DeviceService.model.replaceOne(
        { user_id: body.user_id, device_id: body.device_id },
        { ...body, created_by: currentUserId, updated_by: currentUserId },
        { upsert: true }
    );
    return sendSuccessResponse({ msg: message.success.message, response: res });
};
