const {Router} = require('express')
const router = Router()

router.get('/',(req,res) => {
    res.render('main',{
        title: 'Главная страница',
        menu: 'home'
    })
})

module.exports = router