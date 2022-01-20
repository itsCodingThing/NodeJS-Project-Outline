const ExposeController = require("../../controllers/expose.controller");

const exposeRoute = [
    /**
     * @rotue   POST "/api/v1/expose/convert
     * @desc    convert doc to html
     */
    {
        method: "POST",
        url: "/expose/convert",
        handler: ExposeController.exposeConvert,
    },
];

module.exports = exposeRoute;
