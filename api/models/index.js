const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  contact_number: String,
  username: {
    index: {
      unique: true
    },
    type: String,
    min: 6,
    max: 12,
    required: true
  },
  password: {
    type: String,
    min: 8,
    required: true
  },
  state: String,
  city: String
})

let bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  thumbnail: {
    type: String,
    required: true
  },
  date_added: Date
})

let tradeSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  trader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isCompleted: {
    type: Boolean,
    required: true
  },
  date_added: Date
})

let userModel = mongoose.model('User', userSchema)
let bookModel = mongoose.model('Book', bookSchema)
let tradeModel = mongoose.model('Trade', tradeSchema)

// voteSchema.pre('save', next => {
//   next()
// })

module.exports = {
  Users: userModel,
  Books: bookModel,
  Trades: tradeModel
}
