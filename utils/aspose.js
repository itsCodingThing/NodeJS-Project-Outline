const asposewordscloud = require("asposewordscloud");
const jsdom = require("jsdom");

const config = require("../config/config");

const convertDocApi = new asposewordscloud.WordsApi(config.asposewordscloud.id, config.asposewordscloud.secret_key);

exports.convertWordToHtmlFile = async function (body) {
    try {
        const questionList = [];

        const request = new asposewordscloud.ConvertDocumentRequest({
            format: "html",
            document: body,
        });

        const result = await convertDocApi.convertDocument(request);

        const dom = new jsdom.JSDOM(result.body.toString("utf-8"));
        const tableRow = dom.window.document.querySelectorAll("tr");

        let questionDetails = {
            question: "",
            marks: 0,
            options: [],
            solution: "",
        };

        tableRow.forEach((el) => {
            const tableCols = el.querySelectorAll("td");
            const tag = tableCols[0].innerHTML;
            const value = tableCols[1].innerHTML;

            if (tag.includes("Question")) {
                questionDetails.question = value;
            }

            if (tag.includes("Option")) {
                const isCorrect = tableCols[2].innerHTML.includes("Correct");

                if (isCorrect) {
                    questionDetails.options.push({ option: value, answer: true });
                } else {
                    questionDetails.options.push({ option: value, answer: false });
                }
            }

            if (tag.includes("Solution")) {
                questionDetails.solution = value;
            }

            if (tag.includes("Marks")) {
                questionList.push(questionDetails);

                questionDetails = {
                    question: "",
                    marks: 0,
                    options: [],
                    solution: "",
                };
            }
        });

        return questionList;
    } catch (error) {
        throw new Error("Aspose api error");
    }
};
