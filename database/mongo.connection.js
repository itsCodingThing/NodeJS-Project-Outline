const mongoose = require("mongoose");
const config = require("../config/config.json");

const url = config.mongodb.connectionString;

async function connectToDb() {
    try {
        await mongoose.connect(url, {
            auth: {
                username: config.mongodb.username,
                password: config.mongodb.password,
            },
            dbName: "cip_db",
            useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
            useUnifiedTopology: true,
            autoIndex: true,
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectToDb;
