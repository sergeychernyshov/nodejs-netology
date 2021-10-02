const {Router} = require('express')
const router = Router()

router.get('/*',(req,res) => {
    res.render('noPage',{
        title: 'Не найдена страница',
        menu: 'noPage'
    })
})

module.exports = router