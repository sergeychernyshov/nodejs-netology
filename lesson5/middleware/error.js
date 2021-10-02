const fs = require('fs')
const os = require('os')

module.exports = (req, res) => {
    res.status(404)
    const content = '{"error":"not found api path or method"}'
    res.send(content)
}