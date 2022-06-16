const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        res.render('pos/index', {pos: true})
    } catch (error) {
        console.log("Pos load error: " + error)
        res.redirect("/")
    }


    //res.send(req.body.name)
})


module.exports = router