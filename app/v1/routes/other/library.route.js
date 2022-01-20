const libraryController = require("../../controllers/library.controller");

const libraryRoutes = [
    /**
     * @rotue   POST "/api/library/convert/"
     * @desc    convert word to html
     */
    {
        method: "POST",
        url: "/library/convert",
        handler: libraryController.convertWordToHtml,
    },

    /**
     * @rotue   POST "/library/"
     * @desc    add questions in library
     */
    {
        method: "POST",
        url: "/library",
        handler: libraryController.addQuestions,
    },

    /**
     * @rotue   GET "/library/all/"
     * @desc    get all questions details without -question -solution -options -locale -status -solution
     */
    {
        method: "GET",
        url: "/library/all",
        handler: libraryController.getAllQuestionsDetails,
    },

    /**
     * @rotue   GET "/library/question/:question_id"
     * @desc    get quesions by filters
     */
    {
        method: "GET",
        url: "/library/question/:question_id",
        handler: libraryController.getQuestionById,
    },

    /**
     * @rotue   PUT "/library/"
     * @desc    edit questions
     */
    {
        method: "PUT",
        url: "/library",
        handler: libraryController.editQuestions,
    },

    /**
     * @rotue   POST "/library/delete/"
     * @desc    delete questions
     */
    {
        method: "POST",
        url: "/library/delete",
        handler: libraryController.deleteQuestions,
    },

    /**
     * @rotue   PUT "/library/question/ids/
     * @desc    get questions for ids
     */
    {
        method: "PUT",
        url: "/library/questions/idst",
        handler: libraryController.getQuestionsByIdList,
    },
];

module.exports = libraryRoutes;
