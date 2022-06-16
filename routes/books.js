const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/books')

//All Book Route
router.get('/', async (req, res) => {
    //res.send('All Books')
    let searchOptions = {}
    if (req.query.title != null && req.query.title !== ''){
        searchOptions.title =  new RegExp(req.query.title, "i");
    }

    if(req.query.publishedBefore != null && req.query.publishedBefore != '')
    {
        searchOptions.publishBeforeDate = req.query.publishedBefore;
    }

    if(req.query.publishedAfter != null && req.query.publishedAfter != '')
    {
        searchOptions.publishAfterDate = req.query.publishedAfter;
    }


    try {
        const booksList = new Book();
        //console.log("searchOptions" + JSON.stringify(searchOptions))
        //console.log("searchOptions" + searchOptions.publishBeforeDate)
        const books = await booksList.findBook(searchOptions)

        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })


    } catch (error) {
        console.log("Books Page Load GET ERROR!!! :" + error)
        res.redirect('/')
    }

})

//New Book Route
router.get('/new', async (req, res) => {
    renderNewPage(res, new Book())
})

//Create new Book Route
router.post('/', async (req, res) => {

    const book = new Book(req.body.title, req.body.description, new Date(req.body.publishDate), req.body.pageCount, req.body.author)

    try {
        const newBook = await book.Save()
        //res.redirect(`books/$newBook.id`)
        res.redirect(`books`)

    } catch (error) {
        console.log("Books Page Load POST ERROR!!! :" + error)
        renderNewPage(res, book, true)
        res.redirect('/')        
    }

})

async function renderNewPage(res, book, hasError = false){
    try {
        const authorsList = new Author();
        const authors = await authorsList.findAuthor();        

        const test = new Buffer

        const params = {
            authors: authors,
            book: book
        }
        if (hasError) params.errorMessage = "Error Creating Book"

        res.render('books/new', params)

    } catch (error) {
        console.log("New Page not found: " + error)
        res.redirect('/books')
    }
}

module.exports = router

