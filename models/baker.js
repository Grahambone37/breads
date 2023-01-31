const mongoose = require('mongoose')
const { Schema } = mongoose
const Bread = require('./bread.js')

const bakerSchema = new Schema({
    name: { type: String, required: true, enum: ['Rachel', 'Monica', 'Chandler', 'Joey', 'Ross', 'Phoebe'] },
    startDate: { type: Date, required: true },
    bio: { type: String }
}, { toJSON: { virtuals: true } })

bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})

//HAVE TO DO function() (NO ARROW FUNCTION)
bakerSchema.post('findOneAndDelete', function() {
    //console.log(this)
    Bread.deleteMany({ baker: this._conditions._id })
        .then(deleteStatus => {
            console.log(deleteStatus)
        })
})
   
const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker