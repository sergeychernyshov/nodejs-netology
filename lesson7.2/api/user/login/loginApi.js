const data = require('../../../models/user/configDefaultUser')

class LoginApi {
    static checkLogin(){
        return data
    }
    static getStatusCode(){
        return 201
    }
}

module.exports = LoginApi
