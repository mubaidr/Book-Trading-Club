const router = require('express').Router()
const Trades = require('./../models').Trades

router.get('/api/trades/', (req, res, next) => {
  let id = req.account.data._id

  Trades.find({
    $or: [{
      owner: id
    }, {
      trader: id
    }]
  }).populate(['owner', 'trader', 'book']).sort('date_added').exec(function (err, trades) {
    if (err) next(err)

    res.json(trades)
  })
})

router.put('/api/trades/', (req, res, next) => {
  let trade = new Trades(req.body.trade)
  let isApproved = req.body.isApproved

  trade.isApproved = isApproved

  if (trade.isApproved && !req.account.data.contact_number) {
    res.json({
      redirect: '/profile/?msg=You need to update profile to be able to trade books'
    })
  } else {
    if (trade.owner.toString() === req.account.data._id) {
      trade.isNew = false
      trade.isCompleted = true

      trade.save(err => {
        if (err) next(err)

        res.json(trade)
      })
    } else {
      res.status(403).end()
    }
  }
})

router.post('/api/trades/', (req, res, next) => {
  if (!req.account.data.contact_number) {
    res.json({
      redirect: '/profile/?msg=You need to update profile to be able to trade books'
    })
  } else {
    let trade = new Trades(req.body)
    trade.trader = req.account.data._id
    trade.isCompleted = false
    trade.isApproved = false
    trade.date_added = new Date()

    trade.save(err => {
      if (err) next(err)

      res.json(trade)
    })
  }
})

router.delete('/api/trades/:id/', (req, res, next) => {
  let id = req.params.id
  let userId = req.account.data._id

  Trades.findOneAndRemove({
    _id: id,
    trader: userId
  }).exec((err, trade) => {
    if (err) next(err)

    res.json(trade)
  })
})

module.exports = router
