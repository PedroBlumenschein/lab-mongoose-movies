const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');

router.get('/celebrities', (req, res) => {
    Celebrity.find()
    .then(data => {
        res.render('celebrities/index', {celebritiesList: data})
    })
    .catch(err => console.log(err))
})

router.get('/celebrities/new', (req, res) => {
    //console.log('works')
    res.render('celebrities/new')
})

router.post('/celebrities/new', (req, res) => {
    const {name, occupation, catchPhrase} = req.body
    console.log(name, occupation, catchPhrase)
    Celebrity.create({
        name: name, 
        occupation: occupation, 
        catchPhrase: catchPhrase
    })
    .then( () => res.redirect('/celebrities'))
    .catch( (err) => {
        console.log(err);
        res.render('celebrities/new')
    } )
})

router.get('/celebrities/:id', (req, res) => {
    //res.json(req.params.id)
    Celebrity.findById(req.params.id)
    .then( data => {
        res.render('celebrities/show', {celebrity: data})
    })
    .catch(err => console.log(err))
})

router.post('/celebrities/:id', (req, res) => {
    console.log(req.body)
    const {name, occupation, catchPhrase} = req.body
    Celebrity.findByIdAndUpdate(req.params.id, {
        name: name, 
        occupation: occupation,
        catchPhrase: catchPhrase
    })
    .then( () => res.redirect('/celebrities') )
    .catch ( (err) => console.log(err))

})

router.post('/celebrities/:id/delete', (req, res) => {
    // console.log(req.params.id)
    Celebrity.findByIdAndDelete(req.params.id)
    .then( () => {
        res.redirect('/celebrities')
    })
    .catch( (err) => console.log(err))
})

router.get('/celebrities/:id/edit', (req, res) => {
    console.log(req.params.id)
    Celebrity.findById(req.params.id)
    .then( (data) => res.render('celebrities/edit', {celebrity: data}))
    .catch( (err) => console.log(err))
})




module.exports = router;