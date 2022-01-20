const DeviceController = require("../../controllers/device.controller");

module.exports = [
    /**
     * @route  POST "/api/v1/device"
     * @desc   Add or update device data
     */
    {
        method: "POST",
        url: "/device",
        handler: DeviceController.addUserDeviceDetail,
    },
];
