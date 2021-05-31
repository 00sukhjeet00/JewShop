const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const productRoute = require('./Route/Product.js')
const userRoute = require('./Route/user.js')
const stripe = require('stripe')('Secert Key')
const { v4: uuidv4 } = require('uuid')
app.use(express.json())
app.use(cors())
app.use('/static', express.static(__dirname + '/public'))
mongoose.connect('mongodb+srv://admin:Admin@123@cluster0.sp49l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(console.log("moogoose is connected"))
app.use('/user', userRoute)
app.use('/api/product', productRoute)
app.get('/payment', (req, res) => {
    console.log(req.body.product)
    const { product, token } = req.body
    const idempotencyKey = v4()
    return stripe.customers.create({
        email: token.email,
        source: token.id,
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: product.name
        }, { idempotencyKey })
    }).then(result => { res.status(200).json(result) })
        .catch(err => { console.log(err) })
})
app.listen(5000, () => { console.log('Server started') })