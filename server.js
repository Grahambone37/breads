require('dotenv').config()
const PORT = process.env.PORT
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Bread Home Page')
})

const breadsController = require('./controllors/breads_controller.js')
app.use('/breads', breadsController)

app.get('*', (req, res) => {
    res.status(404).send('Error 404, no page available.')
})

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})


