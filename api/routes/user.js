const router = require('express').Router()

router.get('/api/users/self', (req, res) => {
  let account = req.account
  delete account.data.password
  res.json(account)
})

module.exports = router
