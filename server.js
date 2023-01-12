require('dotenv').config()
const PORT = process.env.PORT
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Bread Home Page')
})

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})


