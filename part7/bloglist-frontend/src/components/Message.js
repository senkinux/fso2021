import React from "react"
import Alert from "react-bootstrap/Alert"

const Message = ({ message, success }) => {
  return success ? (
    <Alert variant="success">{message}</Alert>
  ) : (
    <Alert variant="danger">{message}</Alert>
  )
}

export default Message
