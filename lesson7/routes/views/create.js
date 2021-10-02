const {Router} = require('express')
const router = Router()

router.get('/',async (req,res) => {
    const {id} = req.params
    res.render('create',{
        title: 'Добавить книгу',
        menu: 'create'
    })
})

module.exports = router