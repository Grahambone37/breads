const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')
const _ = require('lodash')
const moreBread = require('../seeders/more_bread')
const Baker = require('../models/baker.js')

breads.get('/', async (req, res) => {
    const foundBakers = await Baker.find().lean()
    const foundBreads = await Bread.find().limit(10).lean()
    // console.log(foundBreads)     
    res.render('index', {
        breads: foundBreads,
        bakers: foundBakers,
        title: 'Index Page'
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
        .then(() => {
            res.redirect('/breads')
        })
        .catch(err => {
            res.send(err)
        })
})

breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', { bakers: foundBakers })
        })
})

breads.get('/seed', (req, res) => {
    Bread.insertMany(moreBread)
        .then(createdBreads => {
            res.redirect('/breads')
        })
})

breads.get('/:arrayIndex', (req, res) => {
    Bread.findById(req.params.arrayIndex)
        .populate('baker')
        .then(foundBread => {
            res.render('show', {
                bread: foundBread
            })
        })
        .catch(err => {
            console.log(err)
            res.status(404).render('error404')
        })
})

breads.put('/:arrayIndex', (req, res) => {
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    Bread.findByIdAndUpdate(req.params.arrayIndex, req.body, { new: true })
        .then(updatedBread => {
            console.log(updatedBread)
            res.redirect(`/breads/${req.params.arrayIndex}`)
        })
})

breads.delete('/:arrayIndex', (req, res) => {
    Bread.findByIdAndDelete(req.params.arrayIndex)
        .then(deletedBread => {
            console.log(deletedBread)
            res.status(303).redirect('/breads')
        })
})

breads.get('/:arrayIndex/edit', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            Bread.findById(req.params.arrayIndex)
                .then(foundBread => {
                    res.render('edit', { bread: foundBread, bakers: foundBakers })
                })
        })
})

module.exports = breads