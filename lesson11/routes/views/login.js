const {Router} = require('express')
const router = Router()

router.get('/',async (req,res) => {
    const status = req.query.status;
    if(!status){
        res.render('login', {
            title: 'Вход/регистрация',
            message: " "
        })
    }else{
        if(status=='create'){
            res.render('login',{
                title: 'Вход/регистрация',
                message: "Пользователь создан"
            })
        }else{
            if(status=='exist'){
                res.render('login',{
                    title: 'Вход/регистрация',
                    message: "Пользователь уже существует"
                })
            }else{
                if(status=='nodata'){
                    res.render('login', {
                        title: 'Вход/регистрация',
                        message: "Не все поля заполнены"
                    })
                }else {
                    if(status=='noconfirmpassword'){
                        res.render('login', {
                            title: 'Вход/регистрация',
                            message: "Пароли не совпадают"
                        })
                    }else {
                        res.render('login', {
                            title: 'Вход/регистрация',
                            message: "Ошибка при создании пользователя"
                        })
                    }
                }
            }
        }
    }


})
module.exports = router