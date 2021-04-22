import React from "react"

const Message = props => {
	return (
		<div>
			<h2 className={props.className} id="message">
				{" "}
				{props.message}
			</h2>
		</div>
	)
}

export default Message
