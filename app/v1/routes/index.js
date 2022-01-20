const MasterRoutes = require("./master");
const AdminRoutes = require("./admin");
const SchoolRoutes = require("./school");
const TeacherRoutes = require("./teacher");
const StudentRoutes = require("./student");
const LibraryRoutes = require("./other/library.route");
const AuthRoutes = require("./other/auth.route");
const FileStorageRoutes = require("./other/file.route");
const DeviceRoutes = require("./other/device.route");
const ExposeRoutes = require("./other/expose.route");

const middleware = require("../../../middleware/middleware");

console.log(
    "Total number of apis: ",
    AuthRoutes.length +
        LibraryRoutes.length +
        MasterRoutes.length +
        AdminRoutes.length +
        SchoolRoutes.length +
        FileStorageRoutes.length +
        TeacherRoutes.length +
        StudentRoutes.length +
        DeviceRoutes.length +
        ExposeRoutes.length
);

module.exports = async (fastify) => {
    /**
     * App request decorator
     */
    fastify.decorateRequest("payload", null);

    /**
     * App prehandler hook
     */
    fastify.addHook("preHandler", middleware);

    /**
     * Auth routes
     */
    AuthRoutes.forEach((route) => fastify.route(route));

    /**
     * Library routes
     */
    LibraryRoutes.forEach((route) => fastify.route(route));

    /**
     * Master routes
     */
    MasterRoutes.forEach((route) => fastify.route(route));

    /**
     * Admin routes
     */
    AdminRoutes.forEach((route) => fastify.route(route));

    /**
     * School routes
     */
    SchoolRoutes.forEach((route) => fastify.route(route));

    /**
     * File storage routes
     */
    FileStorageRoutes.forEach((route) => fastify.route(route));

    /**
     * Expose routes
     */
    ExposeRoutes.forEach((route) => fastify.route(route));

    /**
     * Teacher routes
     */
    TeacherRoutes.forEach((route) => fastify.route(route));

    /**
     * Student routes
     */
    StudentRoutes.forEach((route) => fastify.route(route));

    /**
     * Device routes
     */
    DeviceRoutes.forEach((route) => fastify.route(route));
};
