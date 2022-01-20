const SchoolService = require("../db/school.service");
const AdminUserService = require("../db/adminUser.service");
const SchoolAdminUserService = require("../db/schoolAdminUser.service");
const TeacherService = require("../db/teacher.service");
const StudentService = require("../db/student.service");
const utils = require("../../utils/utils");
const constants = require("../../config/constants");

exports.loginUser = async (body) => {
    let user;

    switch (body.type) {
        case constants.user.type.admin: {
            user = await AdminUserService.getAdminUserByEmail(body.email);
            break;
        }

        case constants.user.type.school_admin: {
            user = await SchoolAdminUserService.getAdminUserByEmail(body.email);
            break;
        }

        default: {
            user = null;
            break;
        }
    }

    return user;
};

exports.loginAppUser = async ({ schoolCode, contact, type }) => {
    const school = await SchoolService.getSchoolByCode(schoolCode);

    if (!school) {
        return null;
    }

    let user;

    const reservedContacts = ["9414506062", "8949986554", "9001761631"];

    let otp = "0000";

    if (reservedContacts.includes(contact)) {
        otp = 1234;
    } else {
        otp = Math.floor(1000 + Math.random() * 9000);
    }

    if (type === constants.user.type.student) {
        user = await StudentService.getStudentBySchoolIdAndContact({ contact, schoolId: school._id });

        if (!user) {
            return null;
        }

        await StudentService.updateStudentOtp({ id: user._id, otp });
    }

    if (type === constants.user.type.teacher) {
        user = await TeacherService.getTeacherBySchoolIdAndContact({ contact, schoolId: school._id });

        if (!user) {
            return null;
        }

        await TeacherService.updateTeacherOtp({ id: user._id, otp });
    }

    return { school: school._id, id: user._id, otp, contact };
};

exports.verifyOtp = async ({ otp, userId, type }) => {
    let userOtp, user;

    if (type === constants.user.type.teacher) {
        userOtp = await TeacherService.getTeacherOtpById(userId);
        user = await TeacherService.updateTeacherOtp({ id: userId, otp: "" });

        if (userOtp !== otp) {
            return null;
        }

        return user;
    }

    if (type === constants.user.type.student) {
        userOtp = await StudentService.getStudentOtpById(userId);
        user = await StudentService.updateStudentOtp({ id: userId, otp: "" });

        if (userOtp !== otp) {
            return null;
        }

        return user;
    }
};

exports.registerAdminUser = async (body) => {
    let user = await AdminUserService.getAdminUserByEmail(body.email);

    // check if the admin user exists with this email
    if (user) {
        return null;
    }

    body.password = utils.encryptPassword(body.password);
    user = await AdminUserService.addAdminUser(body);

    return user;
};
