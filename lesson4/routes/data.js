const http = require('http')

function promiseHttp(city) {
    return new Promise((resolve,reject) => {
        const url = `http://api.weatherstack.com/current?access_key=${process.env.token}&query=${city}`
        http.get(url, (response) => {
            let chunks_of_data = [];

            response.on('data', (fragments) => {
                chunks_of_data.push(fragments);
            })
            response.on('end', () => {
                let response_body = Buffer.concat(chunks_of_data);
                resolve(response_body.toString());
            })
            response.on('error', (error) => {
                reject(error)
            })
        })
    })
}

module.exports =  promiseHttp