require('dotenv').config()
const PORT = process.env.PORT
const express = require('express')
const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Bread Home Page')
})

const breadsController = require('./controllors/breads_controller')
app.use('/breads', breadsController)

app.get('*', (req, res) => {
    res.status(404).render('error404')
})

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})
  

