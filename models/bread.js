//require mongoose
const mongoose = require('mongoose')
//creating shorthand for the Schema constructor
const { Schema } = mongoose

const bakers = ['Rachel', 'Monica', 'Chandler', 'Joey', 'Ross', 'Phoebe']

const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: { type: Boolean, default: true },
  image: { type: String, default: "http://placekitten.com/400/400" },
  baker: {
    type: String,
    enum: bakers,
    default: bakers[Math.floor(Math.random() * bakers.length)]
  }
})

breadSchema.methods.getBakedBy = function () {
  return `${this.name} was baked with love by ${this.baker}`
}

const Bread = mongoose.model('Bread', breadSchema)

module.exports = Bread
