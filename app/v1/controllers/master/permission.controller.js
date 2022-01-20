const PermissionService = require("../../../../services/db/permission.service");
const { sendSuccessResponse } = require("../../../../utils/serverResponse");
const messages = require("../../../../config/message");

/**
 * @rotue   GET "/api/v1/permission/list"
 * @desc    Get all permission list
 */
exports.getPermissionList = async function (req, res) {
    const list = await PermissionService.getPermissionsList();
    return sendSuccessResponse({ msg: messages.success.message, data: list, response: res });
};

/**
 * @rotue   GET "/api/v1/permission/create_permission"
 * @desc    Create new permission
 */
exports.addNewPermission = async function (req, res) {
    const payload = req.payload;
    const body = req.body;

    const permission = await PermissionService.createNewPermission({ ...body, created_by: payload.id });

    return sendSuccessResponse({ msg: messages.success.message, data: permission, response: res });
};

/**
 * @rotue   POST "/api/v1/permission/update_permission"
 * @desc    Update permission by id
 */
exports.updatePermissionById = async function (req, res) {
    const payload = req.payload;
    const body = req.body;

    await PermissionService.updatePermission({
        id: body.id,
        update: { ...body.update, updated_by: payload.id },
    });

    return sendSuccessResponse({ msg: messages.success.message, response: res });
};

/**
 * @rotue   POST "/api/v1/permission/remove_permission"
 * @desc    Remove permission by id
 */
exports.removePermissionById = async function (req, res) {
    const payload = req.payload;
    const body = req.body;

    for (const id of body.ids) {
        await PermissionService.removePermission({ id: id, updated_by: payload.id });
    }

    return sendSuccessResponse({ msg: messages.success.message, response: res });
};
