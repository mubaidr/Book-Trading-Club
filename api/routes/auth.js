const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const validate = require('../models/validators')
const User = require('../models').User
const config = require('../config')

router.post('/auth/register', (req, res, next) => {
  let username = req.body.username.toLowerCase()
  let password = req.body.password
  let passwordHash = bcrypt.hashSync(password, 8)

  if (!validate.username(username) || !validate.password(password)) {
    res.json({
      success: false,
      error: 'Invalid request'
    })
    return
  }

  User.findOne({
    username: username
  }).exec((err, user) => {
    if (err) next(err)

    if (user) {
      res.json({
        success: false,
        error: 'Username already registered'
      })
    } else {
      let user = new User({
        username: username,
        password: passwordHash
      })

      user.save((err, usr) => {
        if (err) next(err)

        jwt.sign({
          data: usr
        }, config.secret, {
          expiresIn: 60 * 60 * 24
        }, function (err, token) {
          if (err) next(err)

          res.json({
            success: true,
            error: null,
            token: token
          })
        })
      })
    }
  })
})

router.post('/auth/login', (req, res, next) => {
  let username = req.body.username.toLowerCase()
  let password = req.body.password

  if (!validate.username(username) || !validate.password(password)) {
    res.json({
      success: false,
      error: 'Invalid request'
    })
    return
  }

  User.findOne({
    username: username
  }, (err, user) => {
    if (err) next(err)

    if (!user) {
      res.json({
        success: false,
        error: 'Authentication failed'
      })
    } else {
      bcrypt.compare(password, user.password, function (err, same) {
        if (err) next(err)

        if (same) {
          jwt.sign({
            data: user
          }, config.secret, {
            expiresIn: 60 * 60 * 24
          }, function (err, token) {
            if (err) next(err)

            res.json({
              success: true,
              error: null,
              token: token
            })
          })
        } else {
          res.json({
            success: false,
            error: 'Authentication failed'
          })
        }
      })
    }
  })
})

router.use('/api/*', (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token']

  if (token) {
    jwt.verify(token, config.secret, (err, account) => {
      if (err) next(err)

      req.account = account
      next()
    })
  } else {
    res.sendStatus(403)
  }
})

module.exports = router
