const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProductSchema = Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'user' }
})
module.exports = Product = mongoose.model('product', ProductSchema)