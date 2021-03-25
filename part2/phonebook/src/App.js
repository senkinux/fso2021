import React, { useState } from "react"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456" },
		{ name: "Ada Lovelace", number: "39-44-5323523" },
		{ name: "Dan Abramov", number: "12-43-234345" },
		{ name: "Mary Poppendieck", number: "39-23-6423122" },
	])

	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")
	const [keyword, setKeyword] = useState("")

	const handleSubmit = e => {
		e.preventDefault()
		const nameObj = {
			name: newName,
			number: newNumber,
		}

		if (persons.find(({ name }) => name === newName)) {
			alert(`${newName} already exists in phonebook`)
		} else {
			setPersons(persons.concat(nameObj))
			setNewName("")
			setNewNumber("")
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
