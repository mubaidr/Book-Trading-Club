const chalk = require('chalk')
const router = require('express').Router()

const authRoutes = require('./auth')
const userRoutes = require('./users')
const bookRoutes = require('./books')

/* Register model routes */
router.use(authRoutes)
router.use(userRoutes)
router.use(bookRoutes)

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
