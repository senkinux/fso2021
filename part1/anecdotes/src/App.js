import React, { useState } from "react"

const Button = ({ handler, text }) => {
	return <button onClick={handler}>{text}</button>
}

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
	]

	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

	const random = max => {
		let num = Math.floor(Math.random() * Math.floor(max))
		return num
	}

	const generateAnecdote = randomNumberGenerator => {
		setSelected(randomNumberGenerator(anecdotes.length))
	}

	const handleVote = idx => {
		let anecdoteList = [...votes]
		anecdoteList[idx] += 1
		setVotes(anecdoteList)
	}

	console.log(votes)

	return (
		<div>
			{anecdotes[selected]}
			<div>has {votes[selected]} votes</div>
			<br />
			<Button handler={() => handleVote(selected)} text="vote" />
			<Button handler={() => generateAnecdote(random)} text="next anecdote" />
		</div>
	)
}

export default App
