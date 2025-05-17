const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL

console.log('connecting to MongoDB URL')
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })


function begins_two_or_three_numbers_and_dash (val) {
  return (/^[0-9]{2,3}-/).test(val)
}

function only_one_dash (val) {
  return /^([^-]*-){1}[^-]*$/.test(val)
}

function use_numbers_only (val) {
  return (/-[0-9]*$/).test(val)
}

const numberValidators = [
  { validator: begins_two_or_three_numbers_and_dash, message: 'Number must begin with either two or three numbers followed by a dash' },
  { validator: only_one_dash, message: 'Number can have only one dash' },
  { validator: use_numbers_only, message: 'Besides the dash, use numbers only' }
]

const personSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8,
    validate: numberValidators
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)