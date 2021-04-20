import React from "react"
import { setFilter } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = ({ setFilter }) => {
  const handleChange = event => {
    const { value } = event.target
    setFilter(value)
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

export default connect(null, { setFilter })(Filter)
