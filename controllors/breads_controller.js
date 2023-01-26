const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')
const _ = require('lodash')

breads.get('/', (req, res) => {
    Bread.find()
        .then(foundBreads => {
            console.log(foundBreads)
            res.render('index', {
                breads: foundBreads,
                title: 'Index Page'
            })
        })
})


breads.get('/new', (req, res) => {
    res.render('new')
})

breads.get('/:arrayIndex/edit', (req, res) => {
    res.render('edit', {
        bread: Bread[req.params.arrayIndex],
        index: req.params.arrayIndex
    })
})

breads.get('/:arrayIndex', (req, res) => {
    Bread.findById(req.params.arrayIndex)
        .then(foundBread => {
            res.render('show', {
                bread: foundBread
            })
        })
        .catch(err => {
            res.status(404).render('error404')
        })
})

breads.post('/', (req, res) => {
    req.body = _.mapValues(req.body, v => v == '' ? undefined : v)
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    Bread.create(req.body)
    res.redirect('/breads')
})

breads.put('/:arrayIndex', (req, res) => {
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    Bread[req.params.arrayIndex] = req.body
    res.redirect(`/breads/${req.params.arrayIndex}`)
})

breads.delete('/:arrayIndex', (req, res) => {
    // Bread.splice(req.params.arrayIndex, 1) 
    Bread.findByIdAndDelete(req.params.arrayIndex)
        .then(deletedBread => {
            console.log(deletedBread)
            res.status(303).redirect('/breads')
        })
})

module.exports = breads