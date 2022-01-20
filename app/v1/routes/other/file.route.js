const fileController = require("../../controllers/file.controller");

module.exports = [
    /**
     * @rotue   POST "/api/v1/file/upload/:type"
     * @desc    Upload file
     */
    {
        method: "POST",
        url: "/file/upload/:type",
        handler: fileController.uploadFile,
    },

    /**
     * @rotue   GET "/api/v1/file/get/:type/:id"
     * @desc    Upload file
     */
    {
        method: "GET",
        url: "/file/get/:type/:id",
        handler: fileController.getFile,
    },

    /**
     * @rotue   GET "/api/v1/file/download/:type/:id"
     * @desc    Upload file
     */
    {
        method: "GET",
        url: "/file/download/:type/:id",
        handler: fileController.downloadFile,
    },
];
