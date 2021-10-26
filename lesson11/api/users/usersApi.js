const Users = require('../../models/users/users')

class UsersApi {
    constructor() {
        this.statusCode = 0
    }

    async createUser(
        fullname,
        email,
        password
    ) {
        try {
            const user = new Users(
                fullname,
                email,
                password)
            await user.createUser()
            this.statusCode = 200
            return user
        } catch (err) {
            this.statusCode = 500
            return err
        }
    }
    /*async updateBook(
        id,
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook,
        filePathStorage) {
        try {
            const book = {
                id: id,
                title: title,
                description: description,
                authors: authors,
                favorite: favorite,
                fileCover: fileCover,
                fileName: fileName,
                fileBook: fileBook,
                filePathStorage: filePathStorage
            }
            const idUuid = await Books.update(book)
            if (idUuid) {
                this.statusCode = 200
                return await Books.getById(idUuid)
            } else {
                this.statusCode = 404
                return '{"error":"books not found"}'
            }
        } catch (e) {
            this.statusCode = 500
            return e
        }
    }

    async deleteBook(id) {
        try {

            const idUuid = await Books.delete(id)
            if (idUuid) {
                this.statusCode = 200
                return '{"status":"success","message":"books delete"}'
            } else {
                this.statusCode = 404
                return '{"status":"error","message":"books not found"}'
            }
        } catch (e) {
            this.statusCode = 500
            console.log(e)
        }
    }

    async getBookById(bookId){
        try {
            const book = Books.getById(bookId)
            this.statusCode = 200
            return book
        }catch (e) {
            this.statusCode = 404
            return e
        }
    }

    async getBookStoragePathById(bookId){
        try {
            const bookPath =Books.getStoragePathById(bookId)
            this.statusCode = 200
            return bookPath
        }catch (e) {
            this.statusCode = 404
            return e
        }
    }

    getAll(){
        try {
            const books = Books.getAll()
            this.statusCode = 200
            return books
        }catch (e) {
            this.statusCode = 500
            return e
        }

    }
    getStatusCode(){
        return this.statusCode
    }*/
}

module.exports = UsersApi