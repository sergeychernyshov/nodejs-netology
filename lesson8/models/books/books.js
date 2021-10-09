const request = require('request')
const { v4: uuid4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const deleteFile = require('../storage/storage')

const COUNTER_URL = process.env.COUNTER_URL || 'localhost';

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
                fileName,
                fileBook,
                filePathStorage) {
        this.id = uuid4()
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.fileBook = fileBook
        this.filePathStorage = filePathStorage
    }

    toJSON(type='normal') {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            authors: this.authors,
            favorite: this.favorite,
            fileCover: this.fileCover,
            fileName: this.fileName,
            fileBook: this.fileBook||"",
            filePathStorage: type==='normal'?this.filePathStorage||"":undefined
        }
    }

    static incrCountView = (bookId) =>{
        request.post(
            {  url: `http://${COUNTER_URL}/counter/${bookId}/incr` },
            (err, res, body) => {
                /*просто пишем в лог в случае ошибки, потеря просмотров не критична*/
                if (err) console.log(err)
            }
        )
    }

    static async getCountView(bookId){
        return new Promise((resolve, reject) => {
            request.get(
                {
                    url: `http://${COUNTER_URL}/counter/${bookId}`
                },
                (err, res, body) => {
                    if (err) return reject(0)
                    const data = JSON.parse(res.body)
                    resolve(JSON.parse(data.cnt||0))
                }
            )
        })
    }

    static async delete(id){
        const books = await Books.getAll()
        const idx = books.findIndex(c=>c.id === id)
        if(idx!=-1){
            const newBooks = books.filter(c=>c.id !== id)
            if(books[idx].filePathStorage!==""){
                deleteFile(books[idx].filePathStorage)
            }
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
            console.log("book.filePathStorage",book.filePathStorage)
            if(book.filePathStorage!==undefined){
                deleteFile(books[idx].filePathStorage)
            }
            if(!book.filePathStorage){
                book.filePathStorage = books[idx].filePathStorage
                book.fileBook = books[idx].fileBook
            }
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

    static async getAll() {
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

    static async getStoragePathById(id) {
        const books = await Books.getAll()
        const idx = books.findIndex(c => c.id === id)
        return books[idx].filePathStorage
    }

}

module.exports = Books