const masterService = require('../services/master.service');
const utils = require('../../utils/util');
const message = require('../../config/message');

getCountries = async (req, reply) => {
    masterService.getCountriesData(req.body).then(response => {
        utils.sendSuccessResponse(response.length, response, reply);
    }).catch(err => {
        utils.sendAndWriteErrorResponse(err, reply);
    })
};

getStateList = async (req, reply) => {
    if (!utils.validateField(req.params.id)) {
        utils.sendErrorResponse(message.master_validation.statusCode, message.master_validation.country_id, reply);
    } else {
        masterService.getStatesData(req.params.id).then(response => {
            utils.sendSuccessResponse(response.length, response, reply);
        }).catch(err => {
            utils.sendAndWriteErrorResponse(err, reply);
        })
    }
};

getCityList = async (req, reply) => {
    if (!utils.validateField(req.params.id)) {
        utils.sendErrorResponse(message.master_validation.statusCode, message.master_validation.state_id, reply);
    } else {
        masterService.getCityData(req.params.id).then(response => {
            utils.sendSuccessResponse(response.length, response, reply);
        }).catch(err => {
            utils.sendAndWriteErrorResponse(err, reply);
        })
    }
};

//export functions
module.exports = {
    getCountries,
    getStateList,
    getCityList
};