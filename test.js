const axios = require('axios')
axios.get('http://localhost:5000/api/product/')
    .then(res => { console.log(res.data) })