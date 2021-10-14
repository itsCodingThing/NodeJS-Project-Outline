/**
 * App Initialization
 */
const cookieParser = require('cookie-parser');
const path = require('path');
const fastify = require('fastify')({bodyLimit: 314572800});
const helmet = require('fastify-helmet');
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'data'),
    prefix: '/public/', 
});
fastify.register(helmet);
fastify.use(cookieParser());

/**
 * App Configuration
 */
const package = require('./package.json');
const message = require('./config/message.json');
const config = require('./config/config.json');

/**
 * App Middleware Configuration
 */
const logger = require("./helpers/logger").Logger;
const jwt = require('./middleware/jwt');

/**
 * App Routing Handler
 */
const routes = require('./routes/routing');
routes.forEach((route, index) => {
    fastify.route(route)
});

// Handle user request and identity request
fastify.use(function (req, res, next) {
    req.headers['Access-Control-Allow-Origin'] = '*';
    req.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    req.headers['Access-Control-Allow-Methods'] = 'PUT, POST, DELETE,GET';
    let NON_AUTH_URLS = [
        '/api/v1/auth/login',
        '/api/v1/auth/register',
        '/public/data'
    ]
    if (!NON_AUTH_URLS.some(v => req.url.toLowerCase().includes(v))  ) {
        if (req.headers.authorization != null && req.headers.authorization !== "") {
            if (jwt.verifyToken(req.headers.authorization)) {
                next()
            } else {
                const err = new Error();
                err.statusCode = message.unAuthorize.statusCode;
                err.message = message.unAuthorize.message;
                next(err)
            }
        } else {
            const err = new Error();
            err.statusCode = message.unAuthorize.statusCode;
            err.message = message.unAuthorize.message;
            next(err)
        }
    } else {
        next()
    }
});

/**
 * App Error Handling
 */
fastify.setErrorHandler(function (error, request, reply) {
    logger.error("app", "setErrorHandler", error);
    reply.send(error)
});

fastify.listen(config.server.port, `${config.server.host}`, function (err, res) {
    console.log(`${package.name} api running on` + res)
});
