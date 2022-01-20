const permissionController = require("../../controllers/master/permission.controller");

module.exports = [
    /**
     * @rotue   GET "/api/v1/permission/list"
     * @desc    Get all permission list
     */
    {
        method: "GET",
        url: "/permission/list",
        handler: permissionController.getPermissionList,
    },

    /**
     * @rotue   GET "/api/v1/permission/create_permission"
     * @desc    Create new permission
     */
    {
        method: "POST",
        url: "/permission/create_permission",
        handler: permissionController.addNewPermission,
    },

    /**
     * @rotue   POST "/api/v1/permission/update_permission"
     * @desc    Update permission by id
     */
    {
        method: "POST",
        url: "/permission/update_permission",
        handler: permissionController.updatePermissionById,
    },

    /**
     * @rotue   POST "/api/v1/permission/remove_permission"
     * @desc    Remove permission by id
     */
    {
        method: "POST",
        url: "/permission/remove_permission",
        handler: permissionController.removePermissionById,
    },
];
