import React, { useState, useEffect } from "react"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import services from "./services/services"

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")
	const [keyword, setKeyword] = useState("")

	useEffect(() => {
		services.getAll().then(res => setPersons(res))
	}, [])

	const handleSubmit = e => {
		e.preventDefault()
		const nameObj = {
			name: newName,
			number: newNumber,
		}

		if (persons.find(({ name }) => name === newName)) {
			alert(`${newName} already exists in phonebook`)
		} else {
			services.create(nameObj).then(address => {
				setPersons(persons.concat(address))
				setNewName("")
				setNewNumber("")
			})

			return
		}
	}

	const filteredNames = persons.filter(person =>
		person.name.toLowerCase().includes(keyword)
	)

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter keyword={keyword} setKeyword={setKeyword} />
			<h2>add a new</h2>
			<PersonForm
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
				handleSubmit={handleSubmit}
			/>
			<h2>Numbers</h2>
			<Persons filteredNames={filteredNames} />
		</div>
	)
}

export default App
