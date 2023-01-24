//require mongoose
const mongoose = require('mongoose')
//creating shorthand for the Schema constructor
const { Schema } = mongoose

const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: { type: Boolean, default: true },
  image: { type: String, default: "http://placekitten.com/400/400" }
})

const Bread = mongoose.model('Bread', breadSchema)

module.exports = Bread
  