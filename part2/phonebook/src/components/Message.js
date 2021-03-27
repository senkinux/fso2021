import React from "react"

const Message = props => {
	return (
		<div>
			<h2 className={props.className}> {props.name}</h2>
		</div>
	)
}

export default Message
