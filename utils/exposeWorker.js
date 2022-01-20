const { execSync } = require("child_process");
const { expose } = require("threads/worker");
const { readFileSync } = require("fs");
const { env } = require("process");
const { sep } = require("path");
const jsdom = require("jsdom");
const os = require("os");

const { storagePath } = require("./utils");

function convertToJson(data = "") {
    const questionList = [];
    const { window } = new jsdom.JSDOM(data);
    const tableRow = window.document.querySelectorAll("tr");

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
}

function convertDocsToHtml(filename = "", filepath = "") {
    // const outputDir = `${storagePath.docs}${sep}${filename}`;
    let command = "";
    const args = `--headless --convert-to html:HTML:EmbedImages ${filepath} --outdir ${storagePath.docs} ${storagePath.docs}${sep}${filename}`;
    const name = filepath.split(sep).pop().replace(".docx", ".html");

    if (os.type() === "Windows_NT") {
        command = `"C:${sep}Program Files${sep}LibreOffice${sep}program${sep}soffice.exe" ${args}`;
    } else {
        command = `soffice ${args}`;
    }

    execSync(command, { shell: env.ComSpec });
    return readFileSync(`${storagePath.docs}${sep}${name}`, "utf-8");
}

expose((filename = "", filepath = "") => convertToJson(convertDocsToHtml(filename, filepath)));
