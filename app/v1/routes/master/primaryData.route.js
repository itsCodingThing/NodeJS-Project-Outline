const primaryDataController = require("../../controllers/master/primaryData.controller");

module.exports = [
    /**
     * @rotue   POST "/api/v1/data/get/:type"
     * @desc    Get all board list
     */
    {
        method: "POST",
        url: "/data/get/:type",
        handler: primaryDataController.getAllBoardList,
    },

    /**
     * @rotue   POST "/api/v1/data/add"
     * @desc    Add primary data
     */
    {
        method: "POST",
        url: "/data/add",
        handler: primaryDataController.addPrimaryData,
    },

    /**
     * @rotue   POST "/api/v1/data/update
     * @desc    Update primary data
     */
    {
        method: "POST",
        url: "/data/update",
        handler: primaryDataController.updatePrimaryData,
    },

    /**
     * @route POST "/api/v1/data/remove"
     * @desc Delete primary data
     */
    {
        method: "POST",
        url: "/data/remove",
        handler: primaryDataController.removePrimaryData,
    },
];
