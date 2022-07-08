const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'CampingGearAPI',
    collection 

app.use(cors())
app.use(express.json())

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to database')
        db = client.db(dbName)
        collection = db.collection('SleepingBags')


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:sleepingBagsName', (req, res) => {
const sleepingBagsName = req.params.sleepingBagsName.toLowerCase();
infoCollection.find({bagbrand: sleepingBagsName}).toArray()
  .then(results => {
    console.log(results)
    res.json(results[0])
})
.catch(error => console.log(error))
    })
})

.catch(error => console.error(error))

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server ${PORT} is running!`)
})