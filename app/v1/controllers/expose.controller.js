const ExposeService = require("../../../services/expose.service");
const { sendSuccessResponse } = require("../../../utils/serverResponse");

/**
 * @rotue   POST "/api/v1/expose/convert
 * @desc    convert doc to html
 */
exports.exposeConvert = async (req, res) => {
    const files = await req.saveRequestFiles();
    const output = await ExposeService.convertDocsToJSON(files[0].filename, files[0].filepath);

    return sendSuccessResponse({ data: output, response: res });
};
