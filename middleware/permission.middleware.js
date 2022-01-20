const { getAdminUserDetails } = require("../services/db/schoolAdminUser.service");
const messages = require("../config/message");
const { sendErrorResponse } = require("../utils/serverResponse");

const PERM_ROUTE = ["school/admin", "school/batch", "school/paper", "school/teacher"];

module.exports = async (req, res) => {
    const currentUserId = req.payload.id;
    const url = req.url;

    if (!PERM_ROUTE.some((r) => url.toLowerCase().includes(r))) {
        return;
    }

    const user = await getAdminUserDetails(currentUserId);

    if (!user) {
        return sendErrorResponse({
            msg: messages.unAuthorizeToken.message,
            code: messages.unAuthorizeToken.statusCode,
            response: res,
        });
    }
};
