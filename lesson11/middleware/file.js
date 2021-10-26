const multer = require('multer')
const { v4: uuid4 } = require('uuid')

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'data/storage')
    },
    filename(req, file, callback) {
        callback(null, `${uuid4()}-${file.originalname}`)
    }
})

module.exports = multer({storage})