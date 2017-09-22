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

let userModel = mongoose.model('User', userSchema)

// voteSchema.pre('save', next => {
//   next()
// })

module.exports = {
  User: userModel
}
