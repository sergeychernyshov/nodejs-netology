const fs = require('fs')
const path = require('path')
const storagePath = path.join(__dirname,"..","..","data","storage")

const deleteFileFromStorage = (file)=>{
    fs.unlink(path.join(storagePath,file),(err)=>{
        if(err) return console.log(err)
    })
}

module.exports = deleteFileFromStorage