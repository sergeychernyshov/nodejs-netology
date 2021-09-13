const fs = require('fs')

module.exports = async (path, data) => {
    try {
        fs.appendFileSync(path, `${data}\n`)
        return true;
    }
    catch (err) {
        console.log('ошибка записи в лог', err)
        return false
    }
}