const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
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
  }
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
    type: String,
    required: true
  },
  borrower: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    required: true
  }
})

let borrowRequestSchema = new mongoose.Schema({
  book: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  borrower: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    required: true
  }
})

let userModel = mongoose.model('User', userSchema)
let bookModel = mongoose.model('Book', bookSchema)
let borrowRequestModel = mongoose.model('borrowRequest', borrowRequestSchema)

// voteSchema.pre('save', next => {
//   next()
// })

module.exports = {
  User: userModel,
  Book: bookModel,
  BorrowRequest: borrowRequestModel
}
