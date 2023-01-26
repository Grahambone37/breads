const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')
const _ = require('lodash')

breads.get('/', (req, res) => {
    Bread.find()
        .then(foundBreads => {
            // console.log(foundBreads)
            res.render('index', {
                breads: foundBreads,
                title: 'Index Page'
            })
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

breads.get('/new', (req, res) => {
    res.render('new')
})

breads.get('/seed', (req, res) => {
    Bread.insertMany([
        {
            name: 'Rye',
            hasGluten: true,
            image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        },
        {
            name: 'French',
            hasGluten: true,
            image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        },
        {
            name: 'Gluten Free',
            hasGluten: false,
            image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        },
        {
            name: 'Pumpernickel',
            hasGluten: true,
            image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        }
    ])
        .then(createdBreads => {
            res.redirect('/breads')
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
    // Bread.splice(req.params.arrayIndex, 1)   
    Bread.findByIdAndDelete(req.params.arrayIndex)
        .then(deletedBread => {
            console.log(deletedBread)
            res.status(303).redirect('/breads')
        })
})

breads.get('/:arrayIndex/edit', (req, res) => {
    Bread.findById(req.params.arrayIndex)
        .then(foundBread => {
            res.render('edit', { bread: foundBread })
        })
})

module.exports = breads