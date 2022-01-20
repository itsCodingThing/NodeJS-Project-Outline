const ResultCopyController = require("../../controllers/result.controller");

module.exports = [
    {
        method: "GET",
        url: "/result/student/:student_id/paper/:paper_id",
        handler: ResultCopyController.getStudentResultCopyByPaperId,
    },

    {
        method: "GET",
        url: "/result/teacher/:teacher_id/paper/:paper_id",
        handler: ResultCopyController.getCheckedCopyByPaperId,
    },
];
