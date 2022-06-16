const express = require('express')
const router = express.Router()
const Book = require('../models/books')

/*
router.get('/', (req, res) => {
    res.render('index')
})
*/
//All Book Route
router.get('/', async (req, res) => {
    //res.send('All Books')

    try {
        const booksList = new Book();
        //console.log("searchOptions" + JSON.stringify(searchOptions))
        //console.log("searchOptions" + searchOptions.publishBeforeDate)
        const books = await booksList.findBook({})

        res.render('index', {
            books: books,
        })

    } catch (error) {
        console.log("Books Page Load GET ERROR!!! :" + error)
        res.redirect('/')
    }

})

module.exports = router