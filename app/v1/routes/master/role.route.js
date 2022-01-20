const roleController = require("../../controllers/master/role.controller");

module.exports = [
    /**
     * @rotue   GET "/api/v1/role/list"
     * @desc    Get all roles list
     */
    {
        method: "GET",
        url: "/role/list",
        handler: roleController.getRoleList,
    },

    /**
     * @rotue   POST "/api/v1/role/add_role"
     * @desc    Add new role
     */
    {
        method: "POST",
        url: "/role/add_role",
        handler: roleController.addNewRole,
    },

    /**
     * @rotue   POST "/api/v1/role/delete_role"
     * @desc    delete role
     */
    {
        method: "POST",
        url: "/role/delete_role",
        handler: roleController.deleteRoleById,
    },
];
