const express = require('express')
const app = express()

const homeRoute = require('./routes/home')
const loginRoute = require('./routes/login')
const noPageRoute = require('./routes/noPage')
const apiLoginRoute = require('./routes/apiLogin')
const apiBooksRoute = require('./routes/apiBooks')

const start = () => {
    app.set('view engine', 'ejs')
    app.use(express.static('static'));

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/api',apiLoginRoute)
    app.use('/api',apiBooksRoute)
    app.use('/login',loginRoute)
    app.use('/',homeRoute)
    app.use('*',noPageRoute)

    const PORT = process.env.PORT || 3000
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
    })
}

start()
