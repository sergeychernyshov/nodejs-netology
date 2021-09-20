const { v4: uuid4 } = require('uuid')
const fs = require('fs')
const path = require('path')

const databasePath = path.join(
    path.dirname(__dirname),
    '..',
    'data',
    'books.json'
)

class Books {
    constructor(title,
                description,
                authors,
                favorite,
                fileCover,
                fileName) {
        this.id = uuid4()
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            authors: this.authors,
            favorite: this.favorite,
            fileCover: this.fileCover,
            fileName: this.fileName
        }
    }

    static async delete(id){
        const books = await Books.getAll()
        const idx = books.findIndex(c=>c.id === id)
        if(idx!=-1){
            const newBooks = books.filter(c=>c.id !== id)
            return new Promise((resolve, reject) => {
                fs.writeFile(databasePath,
                    JSON.stringify(newBooks), err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(id)
                    }
                })
            })
        }else{
            return
        }
    }

    static async update(book) {
        const books = await Books.getAll()
        const idx = books.findIndex(c => c.id === book.id)
        if(idx!=-1) {
            books[idx] = book
            return new Promise((resolve, reject) => {
                fs.writeFile(
                    databasePath,
                    JSON.stringify(books),
                    (err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(book.id)
                        }
                    }
                )
            })
        }else{
            return
        }
    }

    async save() {
        const books = await Books.getAll()
        books.push(this.toJSON())
        return new Promise((resolve, reject) => {
            fs.writeFile(
                databasePath,
                JSON.stringify(books),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(this.id)
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                databasePath,
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content||"[]"))
                    }
                }
            )
        })
    }

    static async getById(id) {
        const books = await Books.getAll()
        return books.find(c => c.id === id)
    }
}

module.exports = Books