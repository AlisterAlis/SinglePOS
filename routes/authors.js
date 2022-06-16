const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//All Authors Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name , 'i')
    }
    try {
        //return all authors
        //const authors = await Authors.find({}) //where / select function of mongodb


        const authorsList = new Author();

        const authors = await authorsList.findAuthor(searchOptions);
        
        res.render('authors/index', 
            {
                authors: authors, 
                searchOptions: req.query
            })
    } catch (error) {
        console.log("Authors Page Load GET ERROR!!! :" + error)
        res.redirect('/')
    }
    
})

//New Authors Route
router.get('/new',  async (req, res) => {
    res.render('authors/new', { author: new Author()})
})

//Create new Author Route
router.post('/', async (req, res) => {
    // const author = new Author({
    //     name: req.body.name
    // })

    const author = new Author(req.body.name);

    //console.log("name:" + req.body.name)

    try {
        const newAuthor = await author.Save()
        //res.redirect(`authors/$newAuthor.id`)
        res.redirect(`authors`)

    } catch (error) {
        //let locals = {errorMessage: "Error Creating Author"}
        console.log("Error Caught: " + error)
        res.render('authors/new', {
            author: author,
            errorMessage: "Error Creating Author"
        })
    }

    //res.redirect(`authors/${newAuthor.id}`)
    //res.redirect(`authors`)


    //res.send(req.body.name)
})

module.exports = router
