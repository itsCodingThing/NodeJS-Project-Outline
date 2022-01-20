const fs = require("fs");
const stream = require("stream/promises");

const utils = require("../../../utils/utils");
const message = require("../../../config/message");
const { sendSuccessResponse, sendErrorResponse } = require("../../../utils/serverResponse");

/**
 * @rotue   POST "/api/v1/file/upload/:type"
 * @desc    Upload file
 */
exports.uploadFile = async (req, res) => {
    const { type = "" } = req.params;

    const data = await req.file({ limits: { fileSize: 100000000 } });

    if (
        (type === "image" && data.mimetype !== "image/jpeg") ||
        (type === "pdf" && data.mimetype !== "application/pdf") ||
        (type === "audio" && data.mimetype !== "audio/aac")
    ) {
        return sendErrorResponse({
            code: message.master_validation.status_code,
            msg: "file format and type does not match",
            response: res,
        });
    }

    const file = utils.getFilePathName(type);

    await stream.pipeline(data.file, fs.createWriteStream(file.filename));
    return sendSuccessResponse({ msg: message.success.message, data: file.fileId, response: res });
};

/**
 * @rotue   GET "/api/v1/file/get/:type/:id"
 * @desc    Get file
 */
exports.getFile = async (req, res) => {
    const { type = "", id = "" } = req.params;

    const filePath = utils.getFilePath({ type, id });

    try {
        const fileBuffer = fs.readFileSync(filePath);

        if (type === "image") {
            return res.type("image/jpeg").send(fileBuffer);
        }

        if (type === "pdf") {
            return res.type("application/pdf").send(fileBuffer);
        }

        if (type === "audio") {
            return res.type("audio/aac").send(fileBuffer);
        }
    } catch {
        return sendErrorResponse({
            msg: "file not found",
            response: res,
        });
    }
};

/**
 * @rotue   GET "/api/v1/file/download/:type/:id"
 * @desc    Get file
 */
exports.downloadFile = async (req, res) => {
    const { type = "", id = "" } = req.params;

    const filePath = utils.getFilePath({ type, id });

    try {
        const fileBuffer = fs.readFileSync(filePath);

        if (type === "image") {
            return res.headers({ "Content-Type": "image/jpeg", "Content-Disposition": "attachment" }).send(fileBuffer);
        }

        if (type === "pdf") {
            return res
                .headers({ "Content-Type": "application/pdf", "Content-Disposition": "attachment" })
                .send(fileBuffer);
        }

        if (type === "audio") {
            return res.headers({ "Content-Type": "audio/aac", "Content-Disposition": "attachment" }).send(fileBuffer);
        }
    } catch {
        return sendErrorResponse({
            msg: "file not found",
            response: res,
        });
    }
};
