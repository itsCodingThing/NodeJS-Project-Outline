const fs = require("fs");
const mongoose = require("mongoose");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const yup = require("yup");
const path = require("path");
const { v4: uuid } = require("uuid");

const dateutils = require("./date");

const { Types, isValidObjectId } = mongoose;

const storagePath = {
    image: path.resolve(__dirname, `..${path.sep}..${path.sep}`, `data${path.sep}image`),
    pdf: path.resolve(__dirname, `..${path.sep}..${path.sep}`, `data${path.sep}pdf`),
    audio: path.resolve(__dirname, `..${path.sep}..${path.sep}`, `data${path.sep}audio`),
    docs: path.resolve(__dirname, `..${path.sep}..${path.sep}`, `data${path.sep}docs`),
};

exports.storagePath = storagePath;

exports.getFilePathName = (type) => {
    const id = `${uuid()}-${dateutils.getUTCTimestamp()}`;

    switch (type) {
        case "image": {
            if (!fs.existsSync(storagePath.image)) {
                fs.mkdirSync(storagePath.image, { recursive: true });
            }

            return { filename: path.resolve(storagePath.image, `${id}.jpeg`), fileId: id };
        }

        case "pdf": {
            if (!fs.existsSync(storagePath.pdf)) {
                fs.mkdirSync(storagePath.pdf, { recursive: true });
            }

            return { filename: path.resolve(storagePath.pdf, `${id}.pdf`), fileId: id };
        }

        case "audio": {
            if (!fs.existsSync(storagePath.audio)) {
                fs.mkdirSync(storagePath.audio, { recursive: true });
            }

            return { filename: path.resolve(storagePath.audio, `${id}.aac`), fileId: id };
        }

        default: {
            return null;
        }
    }
};

exports.getFilePath = ({ type, id }) => {
    switch (type) {
        case "image": {
            return `${storagePath.image}${path.sep}${id}.jpeg`;
        }

        case "pdf": {
            return `${storagePath.pdf}${path.sep}${id}.pdf`;
        }

        case "audio": {
            return `${storagePath.audio}${path.sep}${id}.aac`;
        }

        default:
            return null;
    }
};

exports.encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    return hash;
};

exports.compareHashPassword = (password, hashPassword) => {
    const same = bcrypt.compareSync(password, hashPassword);
    return same;
};

exports.convertToMongodbObjectId = (id) => {
    if (isValidObjectId(id)) {
        return Types.ObjectId(id);
    }

    return null;
};

exports.validMongodbObjectId = (id) => {
    if (isValidObjectId(id)) {
        return true;
    }

    return false;
};

exports.validateObjectKeys = (obj = {}, keys = []) => {
    const objKeys = Object.keys(obj);

    if (objKeys.every((key) => keys.includes(key))) {
        return true;
    }

    return false;
};

exports.validateTokenPayload = (payload) => {
    const schema = yup.object({ id: yup.string().required() });
    return schema.isValidSync(payload);
};

exports.validateField = (params) => {
    if (typeof params === "string") {
        return yup.string().required().isValidSync(params);
    }

    if (Array.isArray(params)) {
        return yup.array().min(1).required().isValidSync(params);
    }

    if (typeof params === "number") {
        return yup.number().required().isValidSync(params);
    }

    return null;
};

exports.generateRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.validatePaperSheduleBody = async (body) => {
    const schema = yup.object({
        school: yup.string().required(),
        batch: yup.string().required(),
        name: yup.string().required(),
        board: yup.string().required(),
        class: yup.string().required(),
        subject: yup.array().of(yup.string()).required(),
        type: yup.string().required(),
        variant: yup.string().required(),
        question_details: yup
            .object({
                type: yup.string().required(),
                total_marks: yup.number().required(),
                pdf: yup.object({ paper: yup.string() }),
                solution_pdf: yup.string(),
                solution_video: yup.string(),
            })
            .required(),
        schedule_details: yup
            .object({
                type: yup.string().required(),
                rejoin: yup.number().required(),
                student_list: yup.array().of(yup.string()).required(),
                copy_check_teachers: yup.array().of(yup.string()).required(),
                copy_upload_teachers: yup.array().of(yup.string()).required(),
                result_declared_teachers: yup.array(),
                start_time: yup.date().required(),
                end_time: yup.date().required(),
                copy_submit_time: yup.date().required(),
            })
            .required(),
    });

    try {
        schema.validateSync(body);
    } catch (error) {
        return { isValid: false, error: error.errors };
    }

    if (!["Subjective", "Objective"].some((el) => body.type === el)) {
        return { isValid: false, error: "invalid paper type" };
    }

    if (!["pdf", "individual", "section"].some((el) => body.question_details.type === el)) {
        return { isValid: false, error: "invalid question type" };
    }

    if (!["Online", "Offline", "Hybrid"].some((el) => body.schedule_details.type === el)) {
        return { isValid: false, error: "invalid schedule type" };
    }

    if (body.question_details.type === "pdf" && body.question_details.pdf.length === 0) {
        return { isValid: false, error: "pdf is not selected" };
    }

    if (body.question_details.type === "individual" && body.question_details.questions.length === 0) {
        return { isValid: false, error: "no questions available" };
    }

    if (body.question_details.type === "section" && body.question_details.sections.length === 0) {
        return { isValid: false, error: "no sections available" };
    }

    if (body.schedule_details.student_list.length === 0) {
        return { isValid: false, error: "no student availabe" };
    }

    if (
        !moment(body.schedule_details.start_time).isValid() &&
        !moment(body.schedule_details.start_time).isValid() &&
        !moment(body.schedule_details.copy_submit_time).isValid()
    ) {
        return { isValid: false, error: "date is not valid" };
    }

    return { isValid: true, error: {} };
};
