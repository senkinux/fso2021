import React, { useState, useEffect } from "react"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import services from "./services/services"
import Message from "./components/Message"
import "./index.css"

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")
	const [keyword, setKeyword] = useState("")
	const [message, setMessage] = useState("")
	const [error, setError] = useState(false)

	useEffect(() => {
		services.getAll().then(res => setPersons(res))
	}, [])

	const handleSubmit = e => {
		e.preventDefault()
		const newContact = {
			name: newName,
			number: newNumber,
		}

		const contactExists = persons.find(({ name }) => name === newName)

		if (contactExists) {
			const updateContact = window.confirm(
				`${contactExists.name} is already in your phonebook. Would you like to update it's number ?`
			)
			if (updateContact) {
				services
					.update(contactExists.id, { ...contactExists, number: newNumber })
					.then(updatedContact => {
						setPersons(
							persons.map(person =>
								person.name === newName ? updatedContact : person
							)
						)
					})
					.catch(err => {
						setMessage(err.response.data.error)
						setError(!error)
						setTimeout(() => {
							setError(error)
							setMessage("")
						}, 2500)
					})
			}
		} else {
			services
				.create(newContact)
				.then(address => {
					setPersons(persons.concat(address))
					setNewName("")
					setNewNumber("")
					setMessage(`Added ${newName}`)
					setTimeout(() => {
						setMessage("")
					}, 2500)
				})
				.catch(err => {
					setError(!error)
					setMessage(err.response.data.error)
					setTimeout(() => {
						setError(error)
						setMessage("")
					}, 2000)
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
			{message && !error ? (
				<Message message={message} className="success" />
			) : null}
			{message && error ? (
				<Message message={message} className="error" />
			) : null}
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
			<Persons
				filteredNames={filteredNames}
				persons={persons}
				setPersons={setPersons}
			/>
		</div>
	)
}

export default App
