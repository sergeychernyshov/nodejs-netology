const {Schema, model} = require('mongoose')

const book = new Schema({
    id: {
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    authors:{
        type:String,
        required:true
    },
    favorite:{
        type:String,
        required:true
    },
    fileCover:{
        type:String,
        required:true
    },
    fileName:{
        type:String,
        required:true
    },
    fileBook:{
        type:String
    },
    filePathStorage:{
        type:String
    }
})

module.exports = model('Book',book)
