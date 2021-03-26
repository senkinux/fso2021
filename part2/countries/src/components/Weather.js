import React, { useEffect, useState } from "react"
import axios from "axios"

const API_KEY = process.env.REACT_APP_API_KEY

const Weather = ({ capital }) => {
	const [city, setCity] = useState(null)

	useEffect(() => {
		axios
			.get(
				`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${capital}&aqi=no`
			)
			.then(res => setCity(res.data))
	}, [capital])

	return (
		<div>
			{!city ? (
				"Loading"
			) : (
				<div>
					<h2>Weather in {city.location.name}</h2>
					<p>
						<strong>Temperature:</strong> {city.current.temp_c} &#8451;
					</p>
					<img src={city.current.condition.icon} alt="Not found"></img>
					<p>
						<strong>Wind: </strong>
						{city.current.wind_mph} mph{" "}
					</p>
				</div>
			)}
		</div>
	)
}

export default Weather
