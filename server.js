const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb+srv://shaman15:Malik2234!@cluster0.ltsuc5f.mongodb.net/?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json())

// const sleepingbags = {
//     'nemodisco15m': {
//         'bagname' : 'Disco 15 Sleeping Bag',
//         'bagbrand': 'Nemo',
//         'temprating': '14 degrees (F), -10 degrees (C)',
//         'price': '$300.00' ,
//         'gender': 'Mens',
//         'fill' : "650-fill-power-down",
//         'weight': '2 lbs, 11 oz. for Regular, 2 lbs, 13 oz. for Long',
//         'dimensions': '72 inches for Regular, 78 inches for Long',
//         'bestuse': 'Backpacking'
//     },
//     'nemodisco30m': {
//         'bagname' : 'Disco 30 Sleeping Bag',
//         'bagbrand': 'Nemo',
//         'temprating': '30 degrees (F), -1 degrees (C)',
//         'price': '$280.00' ,
//         'gender': 'Mens',
//         'fill' : "650-fill-power PFC-free-down",
//         'weight': '1 lbs, 15 oz. for Regular, 2 lbs, 1 oz. for Long',
//         'dimensions': '72 inches for Regular, 78 inches for Long',
//         'bestuse': 'Backpacking'
//     },

//     'nemodisco15w': {
//         'bagname' : 'Disco 15 Sleeping Bag',
//         'bagbrand': 'Nemo',
//         'temprating': '17 degrees (F), -8.33 degrees (C)',
//         'price': '$300.00' ,
//         'gender': 'Womens',
//         'fill' : "650-fill-power-down",
//         'weight': '3 lbs, 1 oz. for Regular, 3 lbs, 3 oz. for Long',
//         'dimensions': '66 inches for Regular, 72 inches for Long',
//         'bestuse': 'Backpacking'
//     },

//     'nemodisco30w': {
//         'bagname' : 'Disco 30 Sleeping Bag',
//         'bagbrand': 'Nemo',
//         'temprating': '30 degrees (F), -1 degrees (C)',
//         'price': '$270.00' ,
//         'gender': 'Womens',
//         'fill' : "650-fill-power PFC-free-down",
//         'weight': '2 lbs, 5 oz. for Regular, 2 lbs, 8 oz. for Long',
//         'dimensions': '66 inches for Regular, 72 inches for Long',
//         'bestuse': 'Backpacking'
//     },

//     'reitrailbreak20m': {
//         'bagname' : 'Trailbreak 20',
//         'bagbrand': 'REI Co-Op',
//         'temprating': '20 degrees (F), -6 degrees (C)',
//         'price': '$109.00' ,
//         'gender': 'Mens',
//         'fill' : "Water-resistant polyester",
//         'weight': '3 lbs, 7 oz. for Regular, 3 lbs, 11 oz. for Long',
//         'dimensions': '72 inches for Regular, 78 inches for Long',
//         'bestuse': 'Backpacking'
//    },

//     'reitrailbreak30m': {
//         'bagname' : 'Trailbreak 30',
//         'bagbrand': 'REI Co-Op',
//         'temprating': '30 degrees (F), -1 degrees (C)',
//         'price': '$99.95' ,
//         'gender': 'Mens',
//         'fill' : "Water-resistant polyester",
//         'weight': '2 lbs, 8 oz. for Regular, 2 lbs, 10 oz. for Long',
//         'dimensions': '72 inches for Regular, 78 inches for Long',
//         'bestuse': 'Backpacking'
//     },

//     'reitrailbreak20w': {
//         'bagname' : 'Trailbreak 20',
//         'bagbrand': 'REI Co-Op',
//         'temprating': '20 degrees (F), -6 degrees (C)',
//         'price': '$109.00' ,
//         'gender': 'Womens',
//         'fill' : "Water-resistant polyester",
//         'weight': '4 lbs, 13 oz. for Regular, 5 lbs, 0 oz. for Long',
//         'dimensions': '66 inches for Regular, 72 inches for Long',
//         'bestuse': 'Backpacking'
//     },

//     'reitrailbreak30w': {
//         'bagname' : 'Trailbreak 30',
//         'bagbrand': 'REI Co-Op',
//         'temprating': '30 degrees (F), -1 degrees (C)',
//         'price': '$99.95' ,
//         'gender': 'Womens',
//         'fill' : "Water-resistant polyester",
//         'weight': '3 lbs, 3 oz. for Regular, 3 lbs, 6 oz. for Long',
//         'dimensions': '66 inches for Regular, 72 inches for Long',
//         'bestuse': 'Backpacking'
//     }
// }

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
    res.json(results[0])
})
.catch(error => console.log(error))
    })
})

.catch(error => console.error(error))

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server ${PORT} is running!`)
})