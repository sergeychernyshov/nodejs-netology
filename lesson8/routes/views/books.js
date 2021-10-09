const {Router} = require('express')
const router = Router()
const books = require('../../models/books/books')

router.get('/',async (req,res) => {
    res.render('index',{
        title: 'Книги',
        menu: 'books',
        books: await books.getAll()
    })
})

module.exports = router