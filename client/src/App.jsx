import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(persons => {
      setPersons(persons)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const phonebookObject = {
      name: newName, number: newNumber
    }

    personService
    .getAll()
    .then(persons => {
        const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        if (existingPerson) {
            if ((/^[0-9]{2,3}-/).test(newNumber) === false || /^([^-]*-){1}[^-]*$/.test(newNumber) === false || (/-[0-9]*$/).test(newNumber) === false || newNumber.length < 8)
              {
                setErrorMessage(' The number should have a form of two or three numbers, a dash and more numbers so that it is at least 8 characters long.')
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
              }

            else {
              if (window.confirm (`${existingPerson.name} is already added to phonebook. Do you want to replace the old number with a new one?`) === true){
                const updatedPerson = { ...existingPerson, number: newNumber }
                personService
                .changeNumber(existingPerson, updatedPerson)
                    .then(() => {
                        setPersons(prevPersons => prevPersons.map(person =>
                            person.id === existingPerson.id ? updatedPerson : person
                          )
                        )
                        setMessage (
                          `${updatedPerson.name}'s number changed.`
                        )
                        setTimeout(() => {
                          setMessage(null)
                        }, 5000)
                    }
                    )
                    .catch(error => {
                      setErrorMessage(`${updatedPerson.name} has already been removed from the server`)
                      setTimeout(() => {
                        setErrorMessage(null)
                      }, 5000)
                    })
                  }     

        }}
        else {
          personService
          .add(phonebookObject)
          .then(person => {
            setPersons(persons.concat(person))
            setNewName('')
            setNewNumber('')

            setMessage (
              `${person.name} added to the phonebook.`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)

          })
          .catch(error => {
            setErrorMessage(
              `${error.response.data.error}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      
      
      }})
      } 


  const removePerson = (personToBeRemoved) => {
    personService.remove(personToBeRemoved)
    .then(() => {
      setPersons(persons.filter(person => person.id !== personToBeRemoved.id))
      setMessage (
        `${personToBeRemoved.name} deleted from the phonebook.`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (event.target.value !== '') {
      setShowAll(false)
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))




  return (
    <div>
      <h2>Phonebook</h2>
        <ErrorMessage errorMessage={errorMessage}/>
        <Notification message={message}/>
        <Filter newFilter = {newFilter} onChange={handleFilterChange}/>
        <PersonForm addName ={addName} newName = {newName} newNumber = {newNumber} handleNameChange ={handleNameChange} handleNumberChange ={handleNumberChange}/>
      <h3>Numbers</h3>
        <PersonsList personsToShow={personsToShow} removePerson={removePerson}/>
    </div>
      
  )

}

export default App