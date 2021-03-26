import React from "react"
import services from "../services/services"

const Persons = ({ filteredNames, setPersons, persons }) => {
	const handleDelete = person => {
		if (
			!window.confirm(`Are you sure you want to delete ${person.name} from your phonebook?
		`)
		) {
			return
		}
		services.remove(person.id).then(() => {
			setPersons(persons.filter(contact => contact.id !== person.id))
		})
	}

	return (
		<div>
			{filteredNames.map(person => (
				<div key={person.id}>
					{person.name} {person.number}{" "}
					<button onClick={() => handleDelete(person)}>delete</button>
				</div>
			))}
		</div>
	)
}

export default Persons
