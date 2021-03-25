import React, { useEffect, useState } from "react"
import axios from "axios"

const App = () => {
	const [countries, setCountries] = useState([])
	const [keyword, setKeyword] = useState("")

	useEffect(() => {
		axios
			.get("https://restcountries.eu/rest/v2/all")
			.then(res => setCountries(res.data))
	}, [])

	const handleChange = e => {
		setKeyword(e.target.value)
	}

	const filteredCountries = countries.filter(person =>
		person.name.toLowerCase().startsWith(keyword.toLowerCase())
	)

	const onClickHandler = countryName => {
		setKeyword(countryName)
	}

	return (
		<div>
			<div>
				find countries: <input value={keyword} onChange={handleChange} />
			</div>
			<br />
			<div>
				{filteredCountries.length > 1 && filteredCountries.length < 10
					? filteredCountries.map(country => (
							<div key={country.name}>
								{country.name}
								<button onClick={() => onClickHandler(country.name)}>
									show
								</button>
							</div>
					  ))
					: filteredCountries.length > 10
					? "Too many matches, specify another filter"
					: filteredCountries.map(country => (
							<div key={country.name}>
								<h2>{country.name}</h2>
								<p>capital {country.capital}</p>
								<p>population {country.population}</p>
								<h2>languages</h2>
								<ul>
									{country.languages.map(lang => (
										<li key={lang.name}>{lang.name}</li>
									))}
								</ul>
								<br />
								<img
									src={country.flag}
									style={{ maxHeight: 100, maxWidth: 100 }}
									alt="flag"
								></img>
							</div>
					  ))}
			</div>
		</div>
	)
}

export default App
