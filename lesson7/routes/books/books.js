const {Router} = require('express')
const router = Router()
const path = require('path')

const fileMiddleware  = require('../../middleware/file')
const BooksApi = require('../../api/books/booksApi')
const booksApi = new BooksApi()
const storagePath = path.join(__dirname,"..","..","data","storage")

router.get('/:id/download',async (req, res) => {
    const {id} = req.params
    const book = await booksApi.getBookById(id)
    const fullFilePath = path.join(storagePath, book.filePathStorage)
    res.download(fullFilePath, book.fileBook, err => {
        if (err) {
            res.status(400).send({
                message: `{"status":"error","message":"${err}"}`
            })
        }
    }) 
})

router.get('/',async (req, res) => {
    const books = await booksApi.getAll()
    res.statusCode = booksApi.getStatusCode()
    res.send(books)
})

router.post('/',
    fileMiddleware.single('file'),
    async (req, res) => {
    if (!req.body || !req.body.title || !req.file) {
        res.statusCode = 400
        if(!req.file) {
            res.send("file none")
        }else{
            res.send("error")
        }
    } else {
        let originalFileName, storageFileName
        if (req.file){
            originalFileName = req.file.originalname
            storageFileName = req.file.filename
        }
         const book = await booksApi.createBook(
             req.body.title,
             req.body.description,
             req.body.authors,
             req.body.favorite,
             req.body.fileCover,
             req.body.fileName,
             originalFileName,
             storageFileName
            )
        if(req.body.mode !== undefined){
            res.redirect('/index')
        }else {
            res.statusCode = booksApi.getStatusCode()
            res.send(book.toJSON('return'))
        }
    }
})

router.post('/:id',
    fileMiddleware.single('file'),
    async (req, res) => {
        if (!req.body || !req.body.title || !req.params.id) {
            res.sendStatus(400)
        } else {
            let originalFileName, storageFileName
            if (req.file){
                originalFileName = req.file.originalname
                storageFileName = req.file.filename
            }
            const book = await booksApi.updateBook(
                req.params.id,
                req.body.title,
                req.body.description,
                req.body.authors,
                req.body.favorite,
                req.body.fileCover,
                req.body.fileName,
                originalFileName,
                storageFileName)
            if(req.body.mode !== undefined){
                res.redirect('/index')
            }else {
                res.statusCode = booksApi.getStatusCode()
                res.send(book)
            }
        }
    })

router.put('/:id',
    fileMiddleware.single('file'),
    async (req, res) => {
    if (!req.body || !req.body.title || !req.params.id) {
        res.sendStatus(400)
    } else {
        let originalFileName, storageFileName
        if (req.file){
            originalFileName = req.file.originalname
            storageFileName = req.file.filename
        }
        const book = await booksApi.updateBook(
            req.params.id,
            req.body.title,
            req.body.description,
            req.body.authors,
            req.body.favorite,
            req.body.fileCover,
            req.body.fileName,
            originalFileName,
            storageFileName)
        if(req.body.mode !== undefined){
            res.redirect('/index')
        }else {
            res.statusCode = booksApi.getStatusCode()
            res.send(book)
        }
    }
})

router.post('/delete/:id',async (req, res) => {
    if (!req.params.id) {
        res.sendStatus(400)
    } else {
        const message = await booksApi.deleteBook(req.params.id)
        if(req.body.mode !== undefined){
            res.redirect('/index')
        }else {
            res.statusCode = booksApi.getStatusCode()
            res.send(message)
        }
    }
})

router.delete('/:id',async (req, res) => {
    if (!req.params.id) {
        res.sendStatus(400)
    } else {
        const message = await booksApi.deleteBook(req.params.id)
        res.statusCode = booksApi.getStatusCode()
        res.send(message)
    }
})

module.exports = router