const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const userSchema = mongoose.Schema({
  name : String,
  email: {
    type: String,
    require: [true, 'Email required'],
    unique: [true, 'Email already exits']
  },
  imageUrl: String,
  password: {
    type: String,
    require: [true, 'password required']
  },
  oauth : Number,
  role: String

}, {
    timestamps: true
})
.pre('save', function() {
  this.password = bcrypt.hashSync(this.password, saltRounds)
})
.pre('update', function() {
  this._update.$set.password = bcrypt.hashSync(this._update.$set.password, saltRounds);
})

let user = mongoose.model('user', userSchema)

module.exports = user
