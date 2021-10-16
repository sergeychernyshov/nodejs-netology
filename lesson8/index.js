const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

const apiLoginRoute = require('./routes/login/login')
const apiBooksRoute = require('./routes/books/books')
const loggerMiddleware = require('./middleware/logger')
const errorMiddleware = require('./middleware/error')

const noPageRoute = require('./routes/views/noPage')
const homeRoute = require('./routes/views/home')
const booksRoute = require('./routes/views/books')
const bookRoute = require('./routes/views/view')
const createBookRoute = require('./routes/views/create')
const updateBookRoute = require('./routes/views/update')

const start = () => {

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

    app.use('/404',noPageRoute)
    app.use(errorMiddleware);

    const PORT = process.env.PORT || 3000
    const mongoUrl = `mongodb+srv://chernyshov:${process.env.MONGOATLASSECRET}@cluster0.o3no6.mongodb.net/library?retryWrites=true&w=majority`
    try{
        await mongoose.connect(url,{useNewUrlParser: true})
        console.log('connect mongoose')
    }
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
    })
}

start()
