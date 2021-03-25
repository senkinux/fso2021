import React from "react"

const Filter = ({ keyword, setKeyword }) => {
	const onInputChange = e => {
		setKeyword(e.target.value.toLowerCase())
	}

	return (
		<div>
			filter show with:{" "}
			<input value={keyword} onChange={e => onInputChange(e)} />
		</div>
	)
}

export default Filter
