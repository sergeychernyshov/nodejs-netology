const {Schema, model} = require('mongoose')

const book = new Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    authors:{
        type:String,
        required:true
    }
})

module.exports = model('Book',book)
