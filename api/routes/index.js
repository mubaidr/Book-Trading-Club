const chalk = require('chalk')
const router = require('express').Router()

const authRoutes = require('./auth')
const userRoutes = require('./user')

/* Register model routes */
router.use(authRoutes)
router.use(userRoutes)

/* 404 */
router.get('*', (req, res) => {
  console.dir(chalk.bgRed('404! Not Found!'))
  res.status(404).end()
})

/* Error handler */
router.use(function (err, req, res, next) {
  console.dir(chalk.bgRed(err))
  res.status(500).send(err)
})

module.exports = router
