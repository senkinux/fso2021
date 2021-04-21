import { useState } from "react"
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

const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  const getAll = () => {
    const fetchedData = axios.get(baseUrl)
    return fetchedData.then(res => setResources(res.data))
  }

  const create = async resource => {
    const fetchedData = await axios.post(baseUrl, resource)
    setResources([...resources, fetchedData.data])
  }

  const service = {
    create,
    getAll,
  }

  return [resources, service]
}

export { useField, useResource }
