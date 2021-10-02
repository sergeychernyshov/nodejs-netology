const fs = require('fs')
const os = require('os')

module.exports = (req, res, next) => {
    const now = new Date()
    const hour = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    const {method, url} = req
    const userAgent = req.get("user-agent")

    let data = `${hour}:${minutes}:${seconds} ${method}, ${url}, user-agent: ${userAgent}`

    fs.appendFile("server.log", data + os.EOL, (err) => {
        if (err) throw err
    })
    next()
}