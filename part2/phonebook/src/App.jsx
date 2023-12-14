import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ value, handleChange }) => {
  return (
    <div>filter shown with
      <input value={value} onChange={handleChange}></input>
    </div>
  )
}

const PersonForm = ({ handleSubmit, handleNameChange, handleNumberChange, valueName, valueNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={valueName} onChange={handleNameChange} required />
      </div>
      <div>
        number: <input value={valueNumber} onChange={handleNumberChange} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, handleDelete }) => {
  return persons.map(person => {
    return (
      <div key={person.id}>{person.name} {person.number} <button key={person.id} onClick={() => handleDelete(person.id)}>delete</button></div>
    )
  })
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(data => setPersons(data))
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)

    if (person) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    if (confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(() =>
          setPersons(persons.filter(p => p.id !== id))
        )
    }
  }

  const personsToShow =
    filterName === ''
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(filterName))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilterChange} value={filterName} />
      <h3>Add a new</h3>
      <PersonForm handleSubmit={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} valueName={newName} valueNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App