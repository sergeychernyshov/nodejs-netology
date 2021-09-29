const {Router} = require('express')
const router = Router()

const BooksApi = require('../../../api/books/booksApi')
const booksApi = new BooksApi()

router.get('/books',async (req, res) => {
    const books = await booksApi.getAll()
    res.statusCode = booksApi.getStatusCode()
    res.send(books)
})

router.get('/books/:id',async (req, res) => {
    if(!req.params.id) {
        res.sendStatus(400)
    }else{
        const books = await booksApi.getBookById(req.params.id)
        res.statusCode = booksApi.getStatusCode()
        res.send(books)
    }
})

router.post('/books',async (req, res) => {
    if (!req.body || !req.body.title) {
        res.sendStatus(400)
    } else {
        const book = await booksApi.createBook(
            req.body.title,
            req.body.description,
            req.body.authors,
            req.body.favorite,
            req.body.fileCover,
            req.body.fileName)
        res.statusCode = booksApi.getStatusCode()
        res.send(book)
    }
})

router.put('/books/:id',async (req, res) => {
    if (!req.body || !req.body.title || !req.params.id) {
        res.sendStatus(400)
    } else {
        const book = await booksApi.updateBook(
            req.params.id,
            req.body.title,
            req.body.description,
            req.body.authors,
            req.body.favorite,
            req.body.fileCover,
            req.body.fileName)

        res.statusCode = booksApi.getStatusCode()
        res.send(book)
    }
})

router.delete('/books/:id',async (req, res) => {
    if (!req.params.id) {
        res.sendStatus(400)
    } else {
        const message = await booksApi.deleteBook(req.params.id)
        res.statusCode = booksApi.getStatusCode()
        res.send(message)
    }
})

module.exports = router