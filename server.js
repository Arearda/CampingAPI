const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'CampingGearAPI',
    collection

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        collection = db.collection('SleepingBags')

//use thie below to create new document in the infoCollection
// db.collection('infoCollection').insertOne({name: "new", bagbrand: ""})
    })

    
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:sleepingBagsName', (req, res) => {
const sleepingBagsName = req.params.sleepingBagsName.toLowerCase();
db.collection('SleepingBags').find({bagbrand: sleepingBagsName}).toArray()
  .then(results => {
    console.log(results)
    res.json(results)
})
.catch(error => console.log(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server ${PORT} is running!`)
})