import React from "react"
import { setFilter } from "../reducers/filterReducer"
import { useSelector, useDispatch } from "react-redux"

const Filter = () => {
  const dispatch = useDispatch()
  // const anecdotes = useSelector(state => {

  // })

  const handleChange = event => {
    // input-field value is in variable event.target.value
    const { value } = event.target
    dispatch(setFilter(value))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
