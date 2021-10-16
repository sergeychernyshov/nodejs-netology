const {Router} = require('express')
const router = Router()

const books = require('../../models/books/books')

router.get('/:id',async (req,res) => {
    const {id} = req.params
    try{
        books.incrCountView(id)
    }catch (err) {
        console.log(err)
    }

    let countView
    try{
        countView = await books.getCountView(id)
    } catch (err) {
        countView = 0
    }
    res.render('view',{
        title: 'Книга',
        menu: 'books',
        book: await books.getById(id),
        countView: countView
    })
})

module.exports = router