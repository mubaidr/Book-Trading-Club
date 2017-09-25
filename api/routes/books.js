const router = require('express').Router()
const Books = require('../models').Books

router.get('/api/books/self', (req, res, next) => {
  let id = req.account.data._id

  Books.find({
    owner_id: id
  }).sort('date_added').exec(function (err, books) {
    if (err) next(err)

    res.json(books)
  })
})

router.get('/api/books', (req, res, next) => {
  Books.find().sort('date_added').exec(function (err, books) {
    if (err) next(err)

    res.json(books)
  })
})

router.get('/api/books/:id', (req, res, next) => {
  let id = req.params.id

  Books.findById(id).exec(function (err, book) {
    if (err) next(err)

    res.json(book)
  })
})

router.post('/api/books', (req, res, next) => {
  let book = new Books(req.body)
  book.owner_id = req.account.data._id

  book.save(function (err, book) {
    if (err) next(err)

    res.json(book)
  })
})

module.exports = router
