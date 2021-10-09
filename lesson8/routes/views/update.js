const {Router} = require('express')
const router = Router()
const books = require('../../models/books/books')

router.get('/:id',async (req,res) => {
    const {id} = req.params
    res.render('update',{
        title: 'Редактировать',
        menu: 'books',
        book: await books.getById(id)
    })
})

module.exports = router