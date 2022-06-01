// app.use(express.static('public'))
// app.use(bodyParser.json())
// const req = require("express/lib/request")

// const { append } = require("express/lib/response")

const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put', 
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})

// app.put('/quotes', (req, res) => {
//     quotesCollection.findOneAndUpdate(
//         { name: 'Yoda' },
//         {
//             $set: {
//                 name: req.body.name,
//                 quote: req.body.quote

//             }
//         },
//         {
//             upsert: true
//         }
//     )
//         .then(result => {
//             console.log(result)

//         })
//         .catch(error => console.error(error))
// })