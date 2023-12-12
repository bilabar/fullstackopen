import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({ persons }) =>
  persons.map(person =>
    <p key={person.id}>{person.name} {person.number}</p>
  )


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`)
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App