const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie')


router.get('/movies', (req, res) => {
    console.log('/moviesGET works')
    Movie.find().populate('cast')
    .then ( (data) => {
        res.render('movies/index', {moviesList: data})
        console.log(data)
    })
    .catch( (err) => console.log(err))

})

router.post('/movies', (req, res) => {
    console.log(req.body)
    const {title, genre, plot, cast} = req.body
    Movie.create({
        title,
        genre, 
        plot, 
        cast
    })
    .then( () => res.redirect('/movies'))
    .catch( (err) => console.log(err))
})

router.get('/movies/new', (req, res) => {
    console.log('/moviesGET works')
    Celebrity.find()
    .then ( (data) => {
        res.render('movies/new', {celebritiesList: data})
        console.log(data)
    })
    .catch( (err) => console.log(err))
})



router.get('/movies/:id/edit', (req, res) => {
    console.log(req.params.id)
    Movie.findById(req.params.id) //.populate(cast)
    .then( data => res.render('movies/edit', {movie: data}))
    .catch( err => console.log(err))
})

router.post('/movies/:id/edit', (req, res) => {
    console.log(req.body)
    const {title, genre, plot, cast} = req.body
    Movie.findByIdAndUpdate(req.params.id, {
        title,
        genre,
        plot,
        cast
    })
    .then( data => res.redirect('/movies'))
    .catch( err => console.log(err))
})







module.exports = router;