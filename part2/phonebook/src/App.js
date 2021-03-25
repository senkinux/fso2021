import React, { useState } from "react"

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

	const onInputChange = e => {
		setKeyword(e.target.value.toLowerCase())
	}

	const filteredNames = persons.filter(person =>
		person.name.toLowerCase().includes(keyword)
	)

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter show with:{" "}
				<input value={keyword} onChange={e => onInputChange(e)} />
			</div>
			<h2>add a new</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name:{" "}
					<input value={newName} onChange={e => setNewName(e.target.value)} />
				</div>
				<div>
					number:{" "}
					<input
						value={newNumber}
						onChange={e => setNewNumber(e.target.value)}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{filteredNames.map(person => (
					<p key={person.name}>
						{person.name} {person.number}
					</p>
				))}
			</div>
		</div>
	)
}

export default App
