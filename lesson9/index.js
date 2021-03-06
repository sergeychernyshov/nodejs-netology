const mongoose = require('mongoose')
const Book = require('./model/book')
const url = require('./config')

async function connect() {
    try {
        await mongoose.connect(url,{useNewUrlParser: true})
        console.log('connect mongoose')
    }catch (err){
        console.log(err)
    }

}

async function disconnect() {
    try {
        await mongoose.disconnect()
        console.log('disconnect mongoose')
    }catch (err){
        console.log(err)
    }
}

async function add(num) {
    const book = new Book({
        title: "book"+num,
        description: "description"+num,
        authors: "authors"+num
    })
    try {
        await book.save()
    }catch (err){
        console.log(err)
    }
}

async function getAll(num) {
    const books = await Book.find({})
    console.log(books)
}

async function getById(id) {
    const books = await Book.findById(id)
    console.log(books)
}

async function update(id,book) {
    const books = await Book.findByIdAndUpdate(id,book)
    console.log(books)
}

async function run() {
    await connect()
    await add(1)
    await add(2)
    await getAll()
    const bookId = "61687c9264d5650041081674"
    await getById(bookId)
    await update(bookId,{
        description: "description999",
        authors: "authors999"
    })
    await getById(bookId)
    await disconnect()
}

run()