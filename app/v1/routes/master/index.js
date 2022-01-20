const primaryDataRoute = require("./primaryData.route");
const permissionRoute = require("./permission.route");
const roleRoutes = require("./role.route");
const MasterController = require("../../controllers/master/master.controller");

module.exports = [
    ...primaryDataRoute,
    ...permissionRoute,
    ...roleRoutes,
    /**
     * @rotue   GET "/api/v1/code/:code"
     * @desc    Verify school code
     */
    {
        method: "GET",
        url: "/code/:code",
        handler: MasterController.verifySchoolCode,
    },

    /**
     * @rotue   POST "/api/v1/notification"
     * @desc    Trigger notification for fcm_id
     */
    {
        method: "POST",
        url: "/notification",
        handler: MasterController.triggerNotification,
    },
];
