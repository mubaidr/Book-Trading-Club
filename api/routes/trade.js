const router = require('express').Router()
const Trades = require('../models').Trades

router.get('/api/trades', (req, res, next) => {
  let id = req.account.data._id

  Trades.find({
    $or: [{
      'owner_id': id
    }, {
      'trader_id': id
    }]
  }).sort('date_added').exec(function (err, trades) {
    if (err) next(err)

    res.json(trades)
  })
})

router.post('/api/trades/:id', (req, res, next) => {
  let id = req.params.id

  Trades.findById(id).exec(function (err, trade) {
    if (err) next(err)

    if (trade.owner_id === req.account.data._id) {
      trade.isCompleted = true

      trade.save(function (err, updatedTrade) {
        if (err) next(err)

        res.josn(updatedTrade)
      })
    } else {
      res.status(403).end()
    }
  })
})

router.post('/api/trades/', (req, res, next) => {
  let trade = new Trades(req.body)
  trade.trader_id = req.account.data_id
  trade.isCompleted = false
  trade.date_added = new Date()

  trade.save(function (err, trade) {
    if (err) next(err)

    res.json(trade)
  })
})

module.exports = router
