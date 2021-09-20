const Books = require('../../models/books/books')

class BooksApi {
    constructor() {
        this.statusCode = 0
    }
    async createBook(title,
                     description,
                     authors,
                     favorite,
                     fileCover,
                     fileName) {
        try {
            const book = new Books(title,
                description,
                authors,
                favorite,
                fileCover,
                fileName)
            await book.save()
            this.statusCode = 200
            return book.toJSON()
        } catch (e) {
            this.statusCode = 500
            return e
        }
    }
    async updateBook(
        id,
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName) {
        try {
            const book = {
                id: id,
                title: title,
                description: description,
                authors: authors,
                favorite: favorite,
                fileCover: fileCover,
                fileName: fileName
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
                return '{"success":"books delete"}'
            } else {
                this.statusCode = 404
                return '{"error":"books not found"}'
            }
        } catch (e) {
            this.statusCode = 500
            console.log(e)
        }
    }

    getBookById(bookId){
        try {
            const book = Books.getById(bookId)
            this.statusCode = 200
            return book
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
    }
}

module.exports = BooksApi