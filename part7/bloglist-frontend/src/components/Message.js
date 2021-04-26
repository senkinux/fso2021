import React from "react"
import styles from "../index.module.css"

const Message = ({ message, success }) => {
  return (
    <div className={success ? styles.success : styles.error}>{message}</div>
  )
}

export default Message
