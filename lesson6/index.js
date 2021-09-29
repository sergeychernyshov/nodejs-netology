const path = require('path')
const express = require('express')
const app = express()


const apiLoginRoute = require('./routes/login/login')
const apiBooksRoute = require('./routes/books/books')
const loggerMiddleware = require('./middleware/logger')
const errorMiddleware = require('./middleware/error')

const start = () => {

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/data', express.static(path.join(__dirname,"data")))

    app.use(loggerMiddleware);
    app.use('/api/user',apiLoginRoute)
    app.use('/api/books',apiBooksRoute)
    app.use(errorMiddleware);

    const PORT = process.env.PORT || 3000
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
    })
}

start()
