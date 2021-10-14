const moment = require('moment');

//get utc date time stamp
exports.getUTCTimestamp = () => {
    var d1 = new Date();
    var utcDate = d1.toUTCString();
    var timeStamp = new Date(utcDate).getTime() / 1000;
    return Math.floor(timeStamp);
};

//get utc date time stamp
exports.convertTimestampToUTCDate = (timeStamp) => {
    var date = new Date(timeStamp * 1000);
    return date.toUTCString();
};

//Add minutes in date
exports.addMinutes = (timeStamp, minutes) => {
    return timeStamp + (minutes * 60 * 1000);
};

//Add hours in date
exports.addHours = (timeStamp, hours) => {
    return timeStamp + (hours * 60 * 60 * 1000);
};

//Add days in date
exports.addDays = (timeStamp, days) => {
    return timeStamp + (days * 24 * 60 * 60 * 1000);
};

//get utc date time stamp
exports.convertTimeStampToFormatDate = (timeStamp) => {
    var date = new Date(timeStamp * 1000);
    return moment(date).format('MMM DD, YYYY');
};

//get utc date time stamp
exports.formatDate = (date, dateFormat) => {
    return moment(date).format(dateFormat);
};