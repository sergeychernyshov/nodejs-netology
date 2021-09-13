const fs = require('fs')

module.exports = async (path) => {
    try {
        return fs.readFileSync(path, 'utf-8')
    }
    catch (err) {
        console.log('ошибка чтения файла лога', err)
    }
}