require('dotenv').config()
const PORT = process.env.PORT
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => { console.log("connected to mongo: ", process.env.MONGO_URI) })

app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('layouts/default')
})

const breadsController = require('./controllors/breads_controller')
app.use('/breads', breadsController)

app.get('*', (req, res) => {
    res.status(404).render('error404')
})

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})
   
 
