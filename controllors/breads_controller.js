const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')

breads.get('/', (req, res) => {
    res.render('index',
        {
            breads: Bread,
            title: 'Index Page'
        }
    )
})

breads.get('/new', (req, res) => {
    res.render('new')
})

breads.get('/:arrayIndex', (req, res) => {
    if (Bread[req.params.arrayIndex]) {
        res.render('Show', {
            bread: Bread[req.params.arrayIndex],
            index: req.params.arrayIndex,
        })
    } else {
        res.status(404).render('error404')
    }
})

breads.post('/', (req, res) => {
    if (!req.body.image) {
        req.body.image = "/images/dough.jpg"
    }
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    Bread.push(req.body)
    res.redirect('/breads')
})

breads.delete('/:arrayIndex', (req, res) => {
    Bread.splice(req.params.arrayIndex, 1)
    res.status(303).redirect('/breads')
})

module.exports = breads