const connections = require('../../database/mysql.connection');
const utils = require('../../utils/util');
const dates = require('../../utils/date');
const enums = require('../../utils/enums');

getCountriesData = () => {
    return new Promise(function (resolve, reject) {
        // mySQl query
        const sqlQuery = "SELECT * FROM `countries` ";
        //Execute query
        connections.ExecuteSelectQuery(sqlQuery)
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    })
};

getStatesData = (country_id) => {
    return new Promise(function (resolve, reject) {
        // mySQl query
        const sqlQuery = "Select * from states where country_id='" + country_id + "' AND status='active'";
        //Execute query
        connections.ExecuteSelectQuery(sqlQuery)
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    })
};

getCityData = (state_id) => {
    return new Promise(function (resolve, reject) {
        // mySQl query
        const sqlQuery = "Select * from cities where state_id='" + state_id + "' AND status='active'";
        //Execute query
        connections.ExecuteSelectQuery(sqlQuery)
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    })
};

//export functions
module.exports = {
    getCountriesData,
    getStatesData,
    getCityData
};