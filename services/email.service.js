const ejs = require("ejs");
const path = require("path");
const nodemailer = require("nodemailer");
// const config = require("../config/config.json");

// const transporter = nodemailer.createTransport({
//     host: config.mail_server.host,
//     port: config.mail_server.port,
//     secure: true, // true for 465, false for other ports
//     auth: {
//         user: config.mail_server.username,
//         pass: config.mail_server.password,
//     },
// });

const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "apikey",
        pass: "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",
    },
});

exports.sendSchoolCredentialMail = async (mail, body = { userLoginId: " ", userPassword: "" }) => {
    const HTMLString = await ejs.renderFile(path.join(__dirname, "../views/schoolMailFormat.ejs"), {
        userLoginId: body.userLoginId,
        userPassword: body.userPassword,
    });

    // from: config.mail_server.from,
    const info = await transporter.sendMail({
        from: "examkul.developers@gmail.com",
        to: mail.to,
        subject: mail.subject,
        text: mail.text,
        html: HTMLString,
    });

    return info.messageId;
};

// if (body.type === "school") {
// } else {
//     const HTMLString = await ejs.renderFile(path.join(__dirname, "../views/mail.ejs"), {
//         userName: body.userName,
//         userLoginId: body.userLoginId,
//         userPassword: body.userPassword,
//         orgName: body.orgName,
//     });

//     const info = await transporter.sendMail({
//         from: config.mail_server.from,
//         to: mail.to,
//         subject: mail.subject,
//         text: mail.text,
//         html: HTMLString,
//     });

//     return info.messageId;
// }
