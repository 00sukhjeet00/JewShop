const Product = require('../modal/productModal')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const User = require('../modal/userModal')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter })
const { Router } = require('express')
const productRoute = Router()
productRoute.get('/', (req, res) => {
    Product.find({}, (err, product) => {
        if (err)
            throw err
        res.json(product)
    })
})
productRoute.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file.originalname)
    const { name, price } = req.body
    const { token } = req.headers
    jwt.verify(token, 'NULL', (err, decode) => {
        if (err) throw err
        const newProduct = new Product({ name: name, price: price, image: req.file.filename, user: decode.userId })
        newProduct.save().then(result => { res.json(result) })
    })
})
module.exports = productRoute