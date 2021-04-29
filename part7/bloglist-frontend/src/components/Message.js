import React from "react"
import styles from "../index.module.css"
import Alert from "react-bootstrap/Alert"

const Message = ({ message, success }) => {
  return success ? (
    <Alert variant="success">{message}</Alert>
  ) : (
    <Alert variant="danger">{message}</Alert>
  )
}

export default Message
