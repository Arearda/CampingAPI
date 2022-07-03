const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb+srv://shaman15:Hollabackboyo@cluster0.ltsuc5f.mongodb.net/?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json())

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to database')
        const db = client.db('CampGearAPI')
        const infoCollection = db.collection('SleepingBags')


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:sleepingBagsName', (req, res) => {
const sleepingBagsName = req.params.sleepingBagsName.toLowerCase();
infoCollection.find({name: sleepingBagsName}).toArray()
  .then(results => {
    console.log(results)
    res.json(results)
})
.catch(error => console.log(error))
    })
})

.catch(error => console.error(error))

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server ${PORT} is running!`)
})