const MasterService = require("../../../../services/master.service");
const { sendSuccessResponse, sendErrorResponse } = require("../../../../utils/serverResponse");

/**
 * @rotue   POST "/api/v1/data/get/:type"
 * @desc    Get all board list
 */
exports.getAllBoardList = async function (req, res) {
    const { type } = req.params;

    let list = [];

    switch (type) {
        case "board": {
            list = await MasterService.getBoardList();
            break;
        }
        case "class": {
            list = await MasterService.getClassList(req.body);
            break;
        }
        case "subject": {
            list = await MasterService.getSubjectList(req.body);
            break;
        }
        case "chapter": {
            list = await MasterService.getChapterList(req.body);
            break;
        }
        case "topic": {
            list = await MasterService.getTopicList(req.body);
            break;
        }
        default: {
            return sendErrorResponse({ msg: "invalid type", response: res });
        }
    }

    return sendSuccessResponse({ msg: "success", data: list, response: res });
};

/**
 * @rotue   POST "/api/v1/data/add"
 * @desc    Add primary data
 */
exports.addPrimaryData = async function (req, res) {
    const body = req.body;

    await MasterService.addPrimaryData(body);
    return sendSuccessResponse({ msg: "success", response: res });
};

/**
 * @route POST "/api/v1/data/update"
 * @desc Update primary data
 */
exports.updatePrimaryData = async function (req, res) {
    const body = req.body;
    await MasterService.updatePrimaryData(body);
    return sendSuccessResponse({ msg: "success", response: res });
};

/**
 * @route POST "/api/v1/data/remove"
 * @desc Delete primary data
 */
exports.removePrimaryData = async function (req, res) {
    const body = req.body;
    await MasterService.removePrimaryData(body);
    return sendSuccessResponse({ msg: "success", response: res });
};
