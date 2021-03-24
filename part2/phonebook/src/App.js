import React, { useState } from "react"

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")

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

	return (
		<div>
			<h2>Phonebook</h2>
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
				{persons.map(person => (
					<p key={person.name}>
						{person.name} {person.number}
					</p>
				))}
			</div>
		</div>
	)
}

export default App
