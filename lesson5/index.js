const express = require('express')
const app = express()

const homeRoute = require('./routes/home')
const loginRoute = require('./routes/login')
const noPageRoute = require('./routes/noPage')
const apiLoginRoute = require('./routes/login/apiLogin')
const apiBooksRoute = require('./routes/books/apiBooks')
const errorMiddleware = require('./middleware/error')

const start = () => {
    app.set('view engine', 'ejs')
    app.use('/',express.static('static'));

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use((err,req,res,next)=>{
        console.log(res.toString())
        next()
    })
    app.use('/api',apiLoginRoute)
    app.use('/api',apiBooksRoute)
    app.use('/login',loginRoute)
    app.use('/',homeRoute)
    //app.use('/*',noPageRoute)
    app.use(errorMiddleware);

    const PORT = process.env.PORT || 3000
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
    })
}

start()
