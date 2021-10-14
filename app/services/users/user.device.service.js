const connections = require('../../../database/mysql.connection');
const dates = require('../../../utils/date');

create = (userParam) => {
    return new Promise(function (resolve, reject) {

        var timeStamp = dates.getUTCTimestamp();
        // mySQl query
        var sqlQuery = "INSERT INTO user_devices(user_id,device_type,device_id,device_ip,device_token,created,created_by,modified,modified_by)";
        sqlQuery = sqlQuery + " VALUES('" + userParam.user_id + "', '" + userParam.device_type
            + "', '" + userParam.device_id + "','" + userParam.ip_address + "', '" + userParam.device_token + "','" + timeStamp + "','" + userParam.user_id + "','" + timeStamp + "','" + userParam.user_id + "')";

        //Execute query
        connections.ExecuteInsertQuery(sqlQuery)
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    })
};

//export functions
module.exports = {
    create
};