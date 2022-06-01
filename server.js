console.log('May Node be with you')

const express = require('express')
const res = require('express/lib/response')
const bodyParser = require('body-parser') //Deprecated in Express.js
const app = express();

const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb+srv://muckitymuck:hbwEBJS2pSG090SZ@cluster0.ny2v6.mongodb.net/?retryWrites=true&w=majority"
const req = require("express/lib/request")
const { append } = require("express/lib/response")
//app.use(bodyParser.urlencoded({ extended: true}))
//replace the above with this line
// app.use(express.urlencoded())

// app.listen(3000, function() {
//     console.log('listening on 3000')
// })

//app.get(endpoint, callback)

// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })
// app.post('/quotes', (req, res) => {
//     console.log(req.body)
// })

// MongoClient.connect(connectionString, (err, client) => {
//     if (err) return console.error(err)
//     console.log('Connected to Database')    
// })

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        //Adds Dynamic HTML, ***Always place this before app.use, app.get, or app.post
        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(bodyParser.json())
        app.use(express.urlencoded())
        //This is the READ part of CRUD
        app.get('/', (req, res) => {
            //res.sendFile(__dirname + '/index.html')
            //const cursor = db.collection('quotes').find().toArray()
            //console.log(cursor)
            db.collection('quotes').find().toArray()
                .then(quotes => {
                    res.render('index.ejs', { quotes: quotes })
                })
                .catch(error => console.error(error))
            

        })

        //This is the CREATE part of CRUD
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                  res.redirect('/')  
                })
                .catch(error => console.error(error))           
        })    
        
        app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                { name: 'yoda' },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
            
                    }
                },
                {
                    upsert: true
                }
            )
                .then(result =>  res.json('Success'))
                .catch(error => console.error(error))
            })
        app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
                { name: req.body.name },

            )
            .then(result => {
                if(result.deletedCount === 0){
                    return res.json('No Quote to delete')
                } 
                res.json("Deleted Darth Vadar's quote") 
            })
            .catch(error => console.error(error))
        })

        app.listen(3000, function() {
            console.log('listening on 3000')
        })
    })
    .catch(console.error)
    