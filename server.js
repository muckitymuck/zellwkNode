console.log('May Node be with you')

const express = require('express');
//const bodyParser = require('body-parser') //Deprecated in Express.js
const app = express();

const MongoClient = require('mongodb').MongoClient

//app.use(bodyParser.urlencoded({ extended: true}))
//replace the above with this line
app.use(express.urlencoded())

app.listen(3000, function() {
    console.log('listening on 3000')
})

//app.get(endpoint, callback)

// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.post('/quotes', (req, res) => {
    console.log(req.body)
})

MongoClient.connect('mongodb-connection-string', (err, client) => {
    
    })