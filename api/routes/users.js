const router = require('express').Router()
const Books = require('../models').Books
const Users = require('../models').Users

router.get('/api/users/self', (req, res, next) => {
  let id = req.account.data._id

  Users.findById(id).exec((err, user) => {
    if (err) next(err)

    res.json(user)
  })
})

router.post('/api/users/', (req, res, next) => {
  let id = req.account.data._id

  Users.findByIdAndUpdate(id, {
    $set: new Users(req.body)
  }, {
    upsert: true,
    new: true
  }, (err, user) => {
    if (err) next(err)

    res.json(user)
  });
})

module.exports = router
