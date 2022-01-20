const QuestionModel = require("../../../database/models/Question");
const { sendResponse, sendSuccessResponse } = require("../../../utils/serverResponse");

/**
 * @rotue   POST "/api/library/convert"
 * @desc    convert word to html
 */
exports.convertWordToHtml = async function (req, res) {
    // const data = await req.file();
    // const buffer = await data.toBuffer();

    // const questionList = await convertWordToHtmlFile(buffer);

    return sendSuccessResponse({
        msg: "successfully converted word file to html.",
        // data: questionList,
        response: res,
    });
};

/**
 * @rotue   POST "/api/library/"
 * @desc    add questions in library
 */
exports.addQuestions = async function (req, res) {
    const { list } = req.body;
    const data = await QuestionModel.addQuestions(list);

    return sendSuccessResponse({ msg: "successfully saved documents to database.", data: data, response: res });
};

/**
 * @rotue   PUT "/api/library/"
 * @desc    edit questions
 */
exports.editQuestions = async function (req, res) {
    const { list } = req.body;
    await QuestionModel.updateQuestions(list);

    return sendSuccessResponse({ msg: "successfully updated documents.", data: {}, response: res });
};

/**
 * @rotue   POST "/api/library/delete"
 * @desc    delete questions
 */
exports.deleteQuestions = async function (req, res) {
    const { ids } = req.body;
    await QuestionModel.deleteQuestionsById(ids);

    return sendSuccessResponse({ msg: "successfully deleted documents.", data: {}, response: res });
};

/**
 * @rotue   GET "/api/library/all"
 * @desc    get all questions details without -question -solution -options -locale -status -solution
 */
exports.getAllQuestionsDetails = async function (req, res) {
    console.log(req);
    const data = await QuestionModel.getAllQuestionsDatails();

    return sendSuccessResponse({ msg: "successfully retreive all documents.", data, response: res });
};

/**
 * @rotue   GET "/api/library/get"
 * @desc    get quesions by filters
 */
exports.getQuestionsByFilters = async function (req, res) {
    const body = req.body;
    const data = await QuestionModel.findRandomQuestions(
        { board: body.board, class: body.class, subject: body.subject },
        body.count
    );

    if (!data) {
        return sendResponse({ code: 200, msg: "documents not found.", data: {}, response: res, status: false });
    }

    return sendSuccessResponse({ msg: "successfully retreive documents.", data, response: res });
};

/**
 * @rotue   GET "/api/library/question/:question_id"
 * @desc    get quesions by filters
 */
exports.getQuestionById = async function (req, res) {
    const { question_id } = req.params;
    const data = await QuestionModel.getQuestionByIdOrIdList(question_id);

    if (!data) {
        return sendResponse({ code: 200, msg: "document not exists.", data: {}, response: res, status: false });
    }

    return sendSuccessResponse({ msg: "successfully retreive documents.", data, response: res });
};

/**
 * @rotue   POST "/api/library/question/ids
 * @desc    get questions for ids
 */
exports.getQuestionsByIdList = async function (req, res) {
    const { ids } = req.body;

    const data = await QuestionModel.getQuestionByIdOrIdList(ids);

    if (!data) {
        return sendResponse({ code: 200, msg: "documents not exists.", data: {}, response: res, status: false });
    }
    return sendSuccessResponse({ msg: "successfully retreive document.", data, response: res });
};
