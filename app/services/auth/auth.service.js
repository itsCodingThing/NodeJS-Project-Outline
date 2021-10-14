const connections = require('../../../database/mysql.connection');
const loginLogService = require('./login.log.service');
const deviceService = require('../users/user.device.service');
const utils = require('../../../utils/util');
const enums = require('../../../utils/enums');
const dates = require('../../../utils/date');
const userService = require('../users/user.service');
const message = require('../../../config/message');

//Login user
login = (params) => {
    return new Promise(function (resolve, reject) {

        let encryptPassword = utils.encryptPassword(params.password);
        let sqlQuery = "";
        sqlQuery = "Select * from users WHERE (email='" + params.email
            + "' OR mobile_number='" + params.email + "') AND password = '" + encryptPassword + "'";

        

        //Execute query
        connections.ExecuteSelectQuery(sqlQuery)
            .then(response => {
                if (response != null && response.length > 0) {
                    let data = response[ 0 ];
                    resolve(data);
                } else {
                    resolve(response);
                }
            }).catch(err => {
                reject(err);
            });
    })
};

register = (params, reply) => {
    return new Promise(async function (resolve, reject) {
        const timeStamp = dates.getUTCTimestamp();

        let checkEmailQuery = "Select * from users WHERE email='" + params.email + "'";
        let checkMobileQuery = "Select * from users WHERE mobile_number='" + params.mobile_number + "'";
        let checkReferralCode = "Select * from users WHERE referral_code='" + params.referral_code + "'";

        let name = params.first_name + " " + params.last_name;
        let encryptPassword = utils.encryptPassword(params.password);
        
        let createUserQuery = "INSERT INTO `users` ( `name`, `email`, `password`,`mobile_number`, `city_id`, `zip_code`, `created`, `modified`)";
        createUserQuery = createUserQuery + " VALUES('" + name + "', '" + params.email + "','"  + encryptPassword + "','" + params.mobile_number + "','" + params.city_id + "','" + params.zip_code + "','" + timeStamp + "','" + timeStamp + "')";

        let isEmailValid = false;
        let isMobileValid = false;

        //Check if Email already exists
        await connections.ExecuteSelectQuery(checkEmailQuery)
            .then(response => {
                if (response != null && response.length > 0) {
                    isEmailValid = false;
                    resolve(utils.sendErrorResponse(message.user_validation.statusCode, message.user_validation.email_already_exists, reply));
                } else {
                    isEmailValid = true;
                }
            }).catch(err => {
                reject(err);
            });

        //Check if Mobile number already exists
        await connections.ExecuteSelectQuery(checkMobileQuery)
            .then(response => {
                if (response != null && response.length > 0) {
                    isMobileValid = false;
                    resolve(utils.sendErrorResponse(message.user_validation.statusCode, message.user_validation.mobile_already_exists, reply));
                } else {
                    isMobileValid = true;
                }
            }).catch(err => {
                reject(err);
            });

        if (isMobileValid == true && isEmailValid == true) {
            doRegistration()
        } else {
            resolve(utils.sendErrorResponse(message.user_validation.statusCode, message.user_validation.error_registration, reply));
            return;
        }

        function doRegistration () {
            //Check if valid referral code
            if (utils.validateField(params.referral_code)) {
                console.log("Hello");
                connections.ExecuteSelectQuery(checkReferralCode)
                    .then(data => { resolve(data) })
                    .catch(err => { reject(err) });
            } else {
                //Execute user registration 
                connections.ExecuteInsertQuery(createUserQuery)
                    .then(data => { resolve(data) })
                    .catch(err => { reject(err) });
            }
        }
    })
};

//export functions
module.exports = {
    login,
    register
};