import React from "react"
import Part from "./Part"

const Content = ({ parts }) => {
	const total = parts.reduce((prev, cur) => prev + cur.exercises, 0)

	console.log(total)

	return (
		<div>
			<div>
				{parts.map(part => (
					<Part key={part.id} name={part.name} exercises={part.exercises} />
				))}
			</div>
			<div>
				<strong>total of {total} exercises</strong>
			</div>
		</div>
	)
}

export default Content
