import React, { useState } from "react"

const Button = ({ text, clickHandler }) => {
	return <button onClick={clickHandler}>{text}</button>
}

const Statistics = ({ text, value }) => {
	return (
		<p>
			{text} {value}
		</p>
	)
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const all = good + bad + neutral
	const average = all === 0 ? 0 : (good - bad) / all
	const positive = all === 0 ? 0 : (good / all) * 100 + " %"

	return (
		<div>
			<h2>give feedback</h2>
			<Button text="good" clickHandler={() => setGood(good + 1)} />
			<Button text="neutral" clickHandler={() => setNeutral(neutral + 1)} />
			<Button text="bad" clickHandler={() => setBad(bad + 1)} />
			<h2>statistics</h2>
			<Statistics text="good" value={good} />
			<Statistics text="neutral" value={neutral} />
			<Statistics text="bad" value={bad} />
			<Statistics text="all" value={all} />
			<Statistics text="average" value={average} />
			<Statistics text="positive" value={positive} />
		</div>
	)
}

export default App
