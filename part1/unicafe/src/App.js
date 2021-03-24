import React, { useState } from "react"

const Button = ({ text, clickHandler }) => {
	return <button onClick={clickHandler}>{text}</button>
}

const Statistics = ({ stats }) => {
	return stats.all < 1 ? (
		<>No feedback given</>
	) : (
		<>
			<p>good {stats.good}</p>
			<p>neutral {stats.neutral}</p>
			<p>bad {stats.bad}</p>
			<p>all {stats.all}</p>
			<p>average {stats.average}</p>
			<p>positive {stats.positive} %</p>
		</>
	)
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const all = good + bad + neutral
	const average = all === 0 ? 0 : (good - bad) / all
	const positive = all === 0 ? 0 : (good / all) * 100

	const stats = { good, bad, neutral, all, average, positive }

	return (
		<div>
			<h2>give feedback</h2>
			<Button text="good" clickHandler={() => setGood(good + 1)} />
			<Button text="neutral" clickHandler={() => setNeutral(neutral + 1)} />
			<Button text="bad" clickHandler={() => setBad(bad + 1)} />
			<h2>statistics</h2>
			<Statistics stats={stats} />
		</div>
	)
}

export default App
