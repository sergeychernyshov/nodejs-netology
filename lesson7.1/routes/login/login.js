const {Router} = require('express')
const router = Router()

const LoginApi = require('../../api/user/login/loginApi')

router.post('/login',(req,res) => {
    res.statusCode = LoginApi.getStatusCode()
    res.send(LoginApi.checkLogin())
})

module.exports = router