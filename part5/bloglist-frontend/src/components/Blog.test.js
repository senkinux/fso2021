import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import Blog from "./Blog"

describe("<Blog />", () => {
	const dummyBlog = {
		author: "Dummy",
		title: "dummy title",
		url: "dummyurl.com",
		likes: 0,
	}
	test("displays author and title but not url or likes", () => {
		const component = render(<Blog blog={dummyBlog} />)
		expect(component.container).toHaveTextContent(dummyBlog.author)
		expect(component.container).toHaveTextContent(dummyBlog.title)
		expect(component.container).not.toHaveTextContent(dummyBlog.url)
		expect(component.container).not.toHaveTextContent(dummyBlog.likes)
	})
})
