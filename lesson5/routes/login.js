const {Router} = require('express')
const router = Router()

router.get('/',(req,res) => {
    res.render('login',{
        title: 'Вход и регистрация',
        isHome: true
    })
})

module.exports = router