const { env } = require("process");
const Fastify = require("fastify");
const helmet = require("fastify-helmet");
const cors = require("fastify-cors");
const multipart = require("fastify-multipart");
const POV = require("point-of-view");
const ejs = require("ejs");

const routes = require("./v1/routes");
const connectToDb = require("../database/mongo.connection");
const { errorHandler } = require("../utils/errorHandler");

exports.buildServer = async function server() {
    await connectToDb();

    const fastify = Fastify({
        bodyLimit: 314572800,
        logger: {
            prettyPrint:
                env.NODE_ENV === "development"
                    ? {
                          translateTime: "HH:MM:ss Z",
                          ignore: "pid,hostname",
                      }
                    : false,
        },
    });

    fastify.register(POV, { engine: { ejs } });
    fastify.register(multipart);
    fastify.register(helmet);
    fastify.register(cors);

    /**
     * Welcome route
     */
    fastify.get("/", (req, res) => res.send("TestnTrack service"));

    /**
     * App Routing Handler
     */
    fastify.register(routes, { prefix: "api/v1" });

    /**
     * App Error Handling
     */
    fastify.setErrorHandler(errorHandler);

    return fastify;
};
