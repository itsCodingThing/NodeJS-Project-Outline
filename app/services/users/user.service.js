const connections = require('../../../database/mysql.connection');
const utils = require('../../../utils/util');
const dates = require('../../../utils/date');
const message = require('../../../config/message');
const enums = require('../../../utils/enums');

// Get user by id
getById = (id) => {
    return new Promise(function (resolve, reject) {
        // mySQl query
        const sqlQuery = "Select * from users WHERE id='" + id + "'";
        //Execute query
        connections.ExecuteSelectQuery(sqlQuery)
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    })
};

//User by email
getByEmail = (params) => {
    return new Promise(function (resolve, reject) {
        // mySQl query
        const sqlQuery = "Select * from users WHERE email='" + params.email + "'";
        //Execute query
        connections.ExecuteSelectQuery(sqlQuery)
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    })
};

//User by mobile number
getByMobile = (mobile_number) => {
    return new Promise(function (resolve, reject) {
        // mySQl query
        const sqlQuery = "Select * from users WHERE mobile_number='" + mobile_number + "'";
        //Execute query
        connections.ExecuteSelectQuery(sqlQuery)
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    })
};

//User by mobile number or email
getByMobileOrEmail = (params) => {
    return new Promise(function (resolve, reject) {
        // mySQl query
        const sqlQuery = "Select * from users WHERE mobile_number='" + params.mobile_number + "' OR email='" + params.email + "'";
        //Execute query
        connections.ExecuteSelectQuery(sqlQuery)
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    })
};

checkUserStatusData = (id) => {
    return new Promise(function (resolve, reject) {
        //MySQL query
        const sqlQuery = "Select * from users where status ='active' AND id ='" + id + "'  ";
        //Execute query
        connections.ExecuteSelectQuery(sqlQuery)
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    })
};

//Update password
updatePassword = (params) => {
    return new Promise(function (resolve, reject) {

        let timeStamp = dates.getUTCTimestamp();
        const encryptPassword = utils.encryptPassword(params.password);

        // mySQl query
        let sqlQuery = "Update users SET modified='" + timeStamp + "', password='" + encryptPassword
            + "'  WHERE id='" + (params.id || params.user_id) + "'";

        //Execute query
        connections.ExecuteUpdateQuery(sqlQuery)
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    })
};

forgotPassword = (params) => {
    return new Promise(function (resolve, reject) {
        // mySQl query
        const sqlQuery = " SELECT * FROM users WHERE email ='" + params.email + "' OR mobile_number ='" + params.email + "' ";
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
    getById,
    getByMobile,
    getByEmail,
    getByMobileOrEmail,
    checkUserStatusData,
    updatePassword,
    forgotPassword
};