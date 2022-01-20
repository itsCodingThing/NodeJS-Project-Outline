const process = require("process");
const { buildServer } = require("./app/app");

/**
 * App Configuration
 */
const pkg = require("./package");
const config = require("./config/config");

async function listenAndServe() {
    try {
        /**
         * App Listen
         */
        const fastify = await buildServer();
        await fastify.ready();
        const address = await fastify.listen(config.server.port, `${config.server.host}`);

        console.log(`${pkg.name} api running on : ${address}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

listenAndServe();
