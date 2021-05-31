const { Router } = require("express");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../modal/userModal')
const userRoute = Router()
userRoute.post('/register', (req, res) => {
    const hashPassword = bcrypt.hashSync(req.body.password, 10)
    const newUser = User({ name: req.body.name, email: req.body.email, password: hashPassword })
    newUser.save(err => {
        if (err)
            return res.status(401).json({ msg: "Email already exist" })
    })
})
userRoute.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err
        if (!user)
            return res.status(401).json({ msg: "Wrong Email/Password" })
        if (!bcrypt.compareSync(req.body.password, user.password))
            return res.status(401).json({ msg: "Wrong Email/Password" })
        const token = jwt.sign({ userId: user._id }, "NULL")
        return res.json({ token: token })
    })
})
module.exports = userRoute
