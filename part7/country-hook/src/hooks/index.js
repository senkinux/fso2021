import { useState, useEffect } from "react"
import axios from "axios"

const useField = type => {
  const [value, setValue] = useState("")

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = name => {
  const [country, setCountry] = useState(null)
  const url = `https://restcountries.eu/rest/v2/name/${name}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (name) {
          const response = await axios(url)
          if (response) {
            const data = response.data[0]
            const found = true
            setCountry({ found, data })
          }
        }
      } catch (error) {
        setCountry({ found: false, data: null })
      }
    }
    fetchData()
  }, [name, url])

  return country
}

export { useCountry, useField }
