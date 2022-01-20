const RoleService = require("../../../../services/db/role.service");
const { sendSuccessResponse } = require("../../../../utils/serverResponse");
const messages = require("../../../../config/message");

/**
 * @rotue   GET "/api/v1/role/list"
 * @desc    Get all roles list
 */
exports.getRoleList = async function (req, res) {
    const list = await RoleService.getRolesList();
    return sendSuccessResponse({ msg: messages.success.message, data: list, response: res });
};

/**
 * @rotue   POST "/api/v1/role/add_role"
 * @desc    Add new role
 */
exports.addNewRole = async function (req, res) {
    const payload = req.payload;
    const body = req.body;

    const result = await RoleService.addNewRole({ ...body, created_by: payload.id });

    return sendSuccessResponse({ msg: messages.success.message, data: result, response: res });
};

/**
 * @rotue   POST "/api/v1/role/delete_role"
 * @desc    delete role
 */
exports.deleteRoleById = async function (req, res) {
    const payload = req.payload;
    const body = req.body;

    for (const id of body.ids) {
        await RoleService.updateRoleById({ id, update: { deleted: true, updated_by: payload.id } });
    }

    return sendSuccessResponse({ msg: messages.success.message, response: res });
};
