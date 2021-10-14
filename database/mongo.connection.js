mongoose = require('mongoose');
const config = require('../config/config.json');
dbMongoSaveConn = mongoose.createConnection(config.mongodb.connectionString, { useNewUrlParser: true });
module.exports = dbMongoSaveConn;