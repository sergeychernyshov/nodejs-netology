const moment = require('moment')
const writer = require('./writer')
const pathToLogs = require('../../utils/getDirLog')

module.exports = async (res, { user, pc }) => {
    const log = res ?
        `${moment().format('LLL')} === ${res};  User: ${user};  PC: ${pc};` :
        `${moment().format('LLL')} === ERROR`
    try {
        await writer(pathToLogs, log)
        return true
    }
    catch (err) {
        console.log('ошибка записи в лог', err);
        return false;
    }
}