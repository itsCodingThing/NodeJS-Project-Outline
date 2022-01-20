const authMiddleware = require("./auth.middleware");
const permissionMiddleware = require("./permission.middleware");

const exceptionalRoutes = [
    "/api/v1/auth/app",
    "/api/v1/auth/login",
    "/api/v1/auth/register",
    "/api/v1/role/list",
    "/api/v1/file",
    "/public/data",
    "/api/v1/app",
    "/api/v1/code",
    "/api/v1/notification",
    "/api/v1/expose",
];

module.exports = async function (req, res) {
    const NON_AUTH_URLS = exceptionalRoutes;

    // check for exceptional routes
    if (NON_AUTH_URLS.some((v) => req.url.toLowerCase().includes(v))) {
        return;
    }

    await authMiddleware(req, res);
    await permissionMiddleware(req, res);
};
