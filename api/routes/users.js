const router = require('express').Router()
const Books = require('../models').Books

/*
router.get('/api/users/self', (req, res) => {
  let account = req.account
  delete account.data.password
  res.json(account)
})
*/

router.get('/api/users/books', (req, res, next) => {
  let id = req.account.data._id

  Books.find({
    owner_id: id
  }).sort('date_added').exec(function (err, books) {
    if (err) next(err)

    res.json(books)
  })
})

module.exports = router
