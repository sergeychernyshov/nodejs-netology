module.exports = (req, res) => {
    res.status(404)
    const {method,url} = req
    const content = `{"error":"not found api path or method", "method":"${method}","url":"${url}"`
    res.send(content)
}