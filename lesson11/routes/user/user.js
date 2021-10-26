const {Router} = require('express')
const usersApi = require('../../api/users/usersApi')

const router = Router()


router.post('/login',(req,res) => {
    throw 'error'
    //res.send(req.body)
})

router.get('/me',(req,res) => {
    res.statusCode =200
})

router.post('/signup',async (req,res) => {
    if (!req.body || !req.body.fullname || !req.body.email || !req.body.password || !req.body.confirmpassword ) {
        res.redirect('/login?status=nodata')
    }else{
        if(req.body.password != req.body.confirmpassword){
            res.redirect('/login?status=noconfirmpassword')
        }
        const user = await usersApi.createUser(
            req.body.fullname,
            req.body.email,
            req.body.password
        )
    }

  console.log(req.body)

    res.redirect('/login?status=error')
})


module.exports = router
