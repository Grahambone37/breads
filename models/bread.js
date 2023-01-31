//require mongoose
const mongoose = require('mongoose')
//creating shorthand for the Schema constructor
const { Schema } = mongoose

const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: { type: Boolean, default: true },
  image: { type: String, default: "http://placekitten.com/400/400" },
  baker: {
    _id: String,
    type: Schema.Types.ObjectId,
    ref: 'Baker'
  }
}, { toJSON: { virtuals: true }})

breadSchema.methods.getBakedBy = function () {
  return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${this.baker.startDate.getFullYear()}`
}
 
const Bread = mongoose.model('Bread', breadSchema)

module.exports = Bread
