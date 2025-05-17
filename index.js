const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.static('build'))

app.use(express.json())

const morgan = require('morgan')
morgan.token('req-body', function (req, res) {
  return JSON.stringify(req['body'])})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))



const Person = require('./models/person')


const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))


app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})


app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      }
      else {
        console.log('ID not found in Phonebook')
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))

})


app.post('/api/persons/', (request, response, next) => {
  const body = request.body

  Person.find({})
    .then (people => {
      console.log(people.find(person => person.name === body.name))
      if (people.find(person => person.name === body.name)) {
        return response.status(400).json({
          error: 'Name must be unique'
        })
      }

      if (!body.name && !body.number) {
        return response.status(400).json({
          error: 'Name and number missing'
        })
      }

      else if (!body.name) {
        return response.status(400).json({
          error: 'Name missing'
        })
      }

      if (!body.number) {
        return response.status(400).json({
          error: 'Number missing'
        })
      }



      const person = new Person ({
        name: body.name,
        number: body.number,
      })

      person.save()
        .then(savedPerson => {
          response.json(savedPerson)
        })
        .catch(error => next(error))
    })

})


app.get('/info', (request, response) => {
  const datetime = new Date(Date.now()).toString()

  Person.find({})
    .then (people => {
      const info =
                `
                <p>Phonebook has info for ${people.length} people.</p>
                <p>${datetime}</p>
                `
      response.send(info)
    })

})

const unknownEndpoint = (request, response) => {
  console.log('Unknown endpoint')
  response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    console.log('Malformatted id')
    return response.status(400).send({ error: 'Malformatted id' })
  }

  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})