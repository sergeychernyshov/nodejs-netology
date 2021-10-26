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

<<<<<<< HEAD
async function getAll() {
=======
async function getAll(num) {
>>>>>>> 645fd20b045a72ba5e7372b8f18741db44cbd2d2
    const books = await Book.find({})
    console.log(books)
}

async function getById(id) {
<<<<<<< HEAD
    const books = await Book.find({id:id})
=======
    const books = await Book.findById(id)
>>>>>>> 645fd20b045a72ba5e7372b8f18741db44cbd2d2
    console.log(books)
}

async function update(id,book) {
    const books = await Book.findByIdAndUpdate(id,book)
    console.log(books)
}

async function run() {
    await connect()
<<<<<<< HEAD
    //await add(1)
    //await add(2)
    //await getAll()
    const bookId = "bdb96a5e-34ea-40f7-8f1a-b2c58fcf6e3f"
    await getById(bookId)
    //await update(bookId,{
    //    description: "description999",
    //    authors: "authors999"
    //})
    //await getById(bookId)
=======
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
>>>>>>> 645fd20b045a72ba5e7372b8f18741db44cbd2d2
    await disconnect()
}

run()