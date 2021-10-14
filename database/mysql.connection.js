
const Sequelize = require('sequelize');
const config = require('../config/config.json');
const logger = require("../helpers/logger").Logger;

const moduleName = "mySql Connection"

const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
    host: config.mysql.host,
    dialect: config.mysql.dialect,
    operatorsAliases: false
});

module.exports = {
    ExecuteSelectQuery,
    ExecuteMultipleSelectQuery,
    ExecuteInsertQuery,
    ExecuteUpdateQuery,
    sequelize,
    ExecuteDeleteQuery
};

//Execute query
async function ExecuteSelectQuery(sqlQuery) {
    return new Promise(function (resolve, reject) {
        sequelize.query(sqlQuery, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                resolve(data);
            }).catch(err => {
                logger.error(moduleName, "ExecuteSelectQuery", err);
                reject(err);
            });
    })
}

//Execute query
async function ExecuteMultipleSelectQuery(sqlQuery) {
    return new Promise(function (resolve, reject) {
        sequelize.query(sqlQuery, { type: sequelize.QueryTypes.RAW })
            .then(data => {
                resolve(data);
            }).catch(err => {
                logger.error(moduleName, "ExecuteMultipleSelectQuery", err);
                reject(err);
            });
    })
}

//Execute query - insert new records
async function ExecuteInsertQuery(sqlQuery) {
    return new Promise(function (resolve, reject) {
        sequelize.query(sqlQuery, { type: sequelize.QueryTypes.INSERT })
            .then(data => {
                resolve(data);
            }).catch(err => {
                logger.error(moduleName, "ExecuteInsertQuery", err);
                reject(err);
            });
    })
}

//Execute query - update records
async function ExecuteUpdateQuery(sqlQuery) {
    return new Promise(function (resolve, reject) {
        sequelize.query(sqlQuery, { type: sequelize.QueryTypes.UPDATE })
            .then(data => {
                resolve(data);
            }).catch(err => {

                logger.error(moduleName, "ExecuteUpdateQuery", err);
                reject(err);
            });
    })
}

//Execute query - update records
async function ExecuteDeleteQuery(sqlQuery) {
    return new Promise(function (resolve, reject) {
        sequelize.query(sqlQuery, { type: sequelize.QueryTypes.DELETE })
            .then(data => {
                resolve(data);
            }).catch(err => {

                logger.error(moduleName, "ExecuteUpdateQuery", err);
                reject(err);
            });
    })
}