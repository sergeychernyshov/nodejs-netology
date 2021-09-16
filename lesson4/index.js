const http = require("http")
const home = require('./routes/home')
const getData = require('./routes/data')
const noPage = require('./routes/nopage')
const {port} = require('./config/server')
const url = require('url')

http.createServer((req,res)=>{
    const urlPath = url.parse(req.url).pathname
    if(urlPath === '/'){
        res.write(home(req))
        res.statusCode = 200
        res.end()
    }else if(urlPath === '/getdata'){
        const city = url.parse(req.url,true).query.city;
        getData(city).then((data)=>{
            res.write(data)
            res.statusCode = 200
            res.end()
        }).catch((err)=>{
            res.write(err)
            res.statusCode = 404
            res.end()
        })
    }else {
        res.write(noPage())
        res.statusCode = 404
        res.end()
    }

}).listen(port);
