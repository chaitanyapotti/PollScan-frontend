const express = require('express')
const app = express()

// app.get('/', (req, res) => res.send('Hello World!'))

app.use('/', express.static('build'))

app.use('/*', function(req, res){
    res.redirect('/')
})

app.listen(2019, () => console.log('pollscan.io on port 2019!'))
