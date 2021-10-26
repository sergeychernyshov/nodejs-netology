const path = require('path')
const mongoose = require('mongoose')
const url = require('./common/config')
const express = require('express')
const session = require('express-session')
const app = express()

app.use(session({
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: null,
    },
    name: '2.7-auth-connect.sid',
    secret: process.env.COOKIE_SECRET||'developer',
    resave: false,
    saveUninitialized: false
}))


const apiLoginRoute = require('./routes/user/user')
const apiBooksRoute = require('./routes/books/books')
const loggerMiddleware = require('./middleware/logger')
const errorMiddleware = require('./middleware/error')

const noPageRoute = require('./routes/views/noPage')
const homeRoute = require('./routes/views/home')
const booksRoute = require('./routes/views/books')
const bookRoute = require('./routes/views/view')
const createBookRoute = require('./routes/views/create')
const updateBookRoute = require('./routes/views/update')
const loginRoute = require('./routes/views/login')

async function start() {

    app.set('view engine', 'ejs')
    app.use('/',express.static('static'))

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/data', express.static(path.join(__dirname,"data")))

    app.use(loggerMiddleware);
    app.use('/api/user', apiLoginRoute)
    app.use('/api/books', apiBooksRoute)
    app.use('/', homeRoute)
    app.use('/index', booksRoute)
    app.use('/view', bookRoute)
    app.use('/create', createBookRoute)
    app.use('/update', updateBookRoute)
    app.use('/login', loginRoute)

    app.use('/404',noPageRoute)
    app.use(errorMiddleware);

    const PORT = process.env.PORT || 3000

    try{
        console.log("url=",url)
        await mongoose.connect(url,{useNewUrlParser: true})
        console.log('connect mongoose')
        app.listen(PORT,()=>{
            console.log(`Server is running on ${PORT}`)
        })
    }catch (err) {
        console.log(err)
    }

}

start()
