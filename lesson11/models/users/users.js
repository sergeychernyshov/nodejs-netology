const User = require('../schema/user')

class Users {
    constructor(email,
               fio,
               password) {
        this.email = email
        this.fio = fio
        this.password = password
    }

    toJSON(type='normal') {
        return {
            email: this.email,
            fio: this.fio,
            password: this.password
        }
    }

    static async getByEmail(email) {
        try {
            const user = await User.find({email:email})
            return user[0]
        }catch (err){
            console.log(err)
        }
    }

    async createUser() {
        const user = new Users(this.toJSON())
        const existUser = Users.getByEmail(this.email)
        if(existUser){
            throw 'user exist'
        }else{
            try{
                await user.save()
            }catch (err){
                console.log(err)
            }


        }
    }
}